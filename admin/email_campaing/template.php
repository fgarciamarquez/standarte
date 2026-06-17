<?php

function campaign_escape($value)
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function campaign_absolute_url($config, $path)
{
    if (preg_match('/^https?:\/\//', $path)) {
        return $path;
    }

    return rtrim($config['site_url'], '/') . '/' . ltrim($path, '/');
}

function campaign_text($category, $lang, $key)
{
    if (isset($category['translations'][$lang]) && isset($category['translations'][$lang][$key])) {
        return $category['translations'][$lang][$key];
    }

    return isset($category[$key]) ? $category[$key] : '';
}

function campaign_tracking_url($config, $email = '')
{
    $url = rtrim($config['site_url'], '/') . '/email-track.php?from=email_campaing';
    if ($email !== '') {
        $url .= '&email=' . urlencode(base64_encode($email));
    }
    return $url;
}

function campaign_extract_company_from_email($email)
{
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return '';
    }
    $parts = explode('@', $email);
    if (count($parts) > 1) {
        $domainParts = explode('.', $parts[1]);
        $name = $domainParts[0];
        $freeProviders = array('gmail', 'hotmail', 'yahoo', 'outlook', 'live', 'icloud', 'aol', 'mail');
        if (in_array(strtolower($name), $freeProviders, true)) {
            return '';
        }
        return ucfirst($name);
    }
    return '';
}

function campaign_resolve_company_name($email, $lang, $companyNameInput = '', $subject = '', $intro = '', $body = '')
{
    // 1. Check if there is any custom placeholder in the inputs (e.g. {Zayer} or {ZAYERR})
    $inputs = array($companyNameInput, $subject, $intro, $body);
    foreach ($inputs as $input) {
        if (preg_match('/\{([^{}]+)\}/', $input, $matches)) {
            $placeholder = trim($matches[1]);
            // Si el placeholder NO es un token genérico (EMPRESA/COMPANY), es un nombre de empresa personalizado.
            // OJO: el drip usa {{COMPANY}}; sin excluir COMPANY, devolvía literalmente "COMPANY" como nombre.
            if (strcasecmp($placeholder, 'EMPRESA') !== 0 && strcasecmp($placeholder, 'COMPANY') !== 0) {
                return $placeholder;
            }
        }
    }

    // 2. If no custom placeholder is found, check if a non-empty companyNameInput is provided
    $resolvedCompanyName = trim($companyNameInput);
    if ($resolvedCompanyName !== '') {
        // If the company name itself has brackets, strip them
        $resolvedCompanyName = preg_replace('/^\{(.*)\}$/', '$1', $resolvedCompanyName);
        return $resolvedCompanyName;
    }

    // 3. Extract company name from email
    $extracted = campaign_extract_company_from_email($email);
    if ($extracted !== '') {
        return $extracted;
    }

    // 4. Default fallbacks
    switch ($lang) {
        case 'en':
            return 'your company';
        case 'de':
            return 'Ihr Unternehmen';
        case 'pt':
            return 'sua empresa';
        case 'zh':
            return '贵公司';
        case 'hi':
            return 'आपकी कंपनी';
        default:
            return 'su empresa';
    }
}

function campaign_process_placeholders($text, $companyName)
{
    // 1. Reemplazar {EMPRESA}, {{EMPRESA}}, {COMPANY}, {{COMPANY}} (case-insensitive) por el nombre de la empresa resuelto
    $text = preg_replace('/\{\{EMPRESA\}\}/i', $companyName, $text);
    $text = preg_replace('/\{EMPRESA\}/i', $companyName, $text);
    $text = preg_replace('/\{\{COMPANY\}\}/i', $companyName, $text);
    $text = preg_replace('/\{COMPANY\}/i', $companyName, $text);

    // 2. Limpiar cualquier otro bracket personalizado (ej. {Zayer} -> Zayer)
    $text = preg_replace('/\{([^{}]+)\}/', '$1', $text);

    return $text;
}

function campaign_build_email($config, $category, $recipientEmail, $lang, $subject = '', $introOverride = '', $bodyOverride = '', $companyName = '')
{
    $siteUrl = rtrim($config['site_url'], '/');
    $landingUrl = campaign_tracking_url($config, $recipientEmail);
    $logoUrl = $siteUrl . '/img/logo_stand-arte_negro.svg';
    $phone = campaign_escape($config['phone']);
    $email = campaign_escape($recipientEmail);
    $htmlLang = isset($config['languages'][$lang]['html']) ? $config['languages'][$lang]['html'] : 'es';
    $footerText = isset($config['footer_text'][$lang]) ? $config['footer_text'][$lang] : $config['footer_text']['es'];
    $headerText = isset($config['header_text'][$lang]) ? $config['header_text'][$lang] : $config['header_text']['es'];

    // Cargar configuración de Supabase para firma legal
    $configFile = dirname(dirname(__DIR__)) . '/supabase-config.php';
    if (!is_file($configFile)) {
        $configFile = dirname(dirname(dirname(__DIR__))) . '/supabase-config.php';
    }
    if (is_file($configFile)) {
        require_once $configFile;
    }
    
    $unsubscribeLink = '';
    if (defined('UNSUBSCRIBE_SECRET_SALT')) {
        $emailBase64 = base64_encode($recipientEmail);
        $unsubToken = md5($recipientEmail . UNSUBSCRIBE_SECRET_SALT);
        $unsubscribeLink = $siteUrl . "/unsubscribe.php?email=" . urlencode($emailBase64) . "&token=" . urlencode($unsubToken);
    }
    
    $unsubscribeHtml = '';
    if ($unsubscribeLink !== '') {
        switch ($lang) {
            case 'en':
                $unsubscribeHtml = '<p style="margin:16px 0 0;font-size:12px;line-height:1.5;color:#777;text-align:center;">If you do not want to receive these emails, you can <a href="' . campaign_escape($unsubscribeLink) . '" target="_blank" style="color:#b89400;text-decoration:underline;font-weight:bold;">unsubscribe here</a>.</p>';
                break;
            case 'de':
                $unsubscribeHtml = '<p style="margin:16px 0 0;font-size:12px;line-height:1.5;color:#777;text-align:center;">Wenn Sie keine weiteren E-Mails erhalten möchten, können Sie sich <a href="' . campaign_escape($unsubscribeLink) . '" target="_blank" style="color:#b89400;text-decoration:underline;font-weight:bold;">hier abmelden</a>.</p>';
                break;
            case 'pt':
                $unsubscribeHtml = '<p style="margin:16px 0 0;font-size:12px;line-height:1.5;color:#777;text-align:center;">Se não deseja receber mais estes e-mails, pode <a href="' . campaign_escape($unsubscribeLink) . '" target="_blank" style="color:#b89400;text-decoration:underline;font-weight:bold;">cancelar a inscrição aqui</a>.</p>';
                break;
            case 'zh':
                $unsubscribeHtml = '<p style="margin:16px 0 0;font-size:12px;line-height:1.5;color:#777;text-align:center;">如果您不想再收到这些邮件，可以<a href="' . campaign_escape($unsubscribeLink) . '" target="_blank" style="color:#b89400;text-decoration:underline;font-weight:bold;">点击此处取消订阅</a>。</p>';
                break;
            case 'hi':
                $unsubscribeHtml = '<p style="margin:16px 0 0;font-size:12px;line-height:1.5;color:#777;text-align:center;">यदि आप ये ईमेल प्राप्त नहीं करना चाहते हैं, तो आप <a href="' . campaign_escape($unsubscribeLink) . '" target="_blank" style="color:#b89400;text-decoration:underline;font-weight:bold;">यहां सदस्यता समाप्त कर सकते हैं</a>।</p>';
                break;
            default:
                $unsubscribeHtml = '<p style="margin:16px 0 0;font-size:12px;line-height:1.5;color:#777;text-align:center;">En cumplimiento de la LSSI-CE y el RGPD, si no deseas recibir más correos de diseño ferial, puedes <a href="' . campaign_escape($unsubscribeLink) . '" target="_blank" style="color:#b89400;text-decoration:underline;font-weight:bold;">darte de baja haciendo clic aquí</a>.</p>';
                break;
        }
    }




    // Resolve the actual company name to use
    $resolvedCompanyName = campaign_resolve_company_name($recipientEmail, $lang, $companyName, $subject, $introOverride, $bodyOverride);

    $rawSubject = $subject !== '' ? $subject : campaign_text($category, $lang, 'subject');
    $emailTitle = campaign_process_placeholders($rawSubject, $resolvedCompanyName);

    $rawIntro = $introOverride !== '' ? $introOverride : campaign_text($category, $lang, 'intro');
    $emailIntro = campaign_process_placeholders($rawIntro, $resolvedCompanyName);

    $rawBody = $bodyOverride !== '' ? $bodyOverride : campaign_text($category, $lang, 'body');
    $emailBody = campaign_process_placeholders($rawBody, $resolvedCompanyName);

    $emailHeadline = campaign_process_placeholders(campaign_text($category, $lang, 'headline'), $resolvedCompanyName);
    $emailCta = campaign_process_placeholders(campaign_text($category, $lang, 'cta'), $resolvedCompanyName);

    $imageHtml = '';
    $imagesList = $category['images'];
    shuffle($imagesList);
    $selectedImages = array_slice($imagesList, 0, 1);
    foreach ($selectedImages as $image) {
        $imageHtml .= '<a href="' . campaign_escape($landingUrl) . '" style="display:block;text-decoration:none;border:0;margin:0 0 22px 0;">';
        $imageHtml .= '<img src="' . campaign_escape(campaign_absolute_url($config, $image['src'])) . '" width="680" alt="' . campaign_escape($image['alt']) . '" style="display:block;width:100%;max-width:680px;height:auto;border:0;margin:0 auto;" />';
        $imageHtml .= '</a>';
    }

    return '<!doctype html>
<html lang="' . campaign_escape($htmlLang) . '">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>' . campaign_escape($emailTitle) . '</title>
</head>
<body style="margin:0;padding:0;background:#f7f6f1;color:#252525;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">' . campaign_escape(campaign_text($category, $lang, 'preheader')) . '</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f7f6f1;margin:0;padding:0;">
    <tr>
      <td align="center" style="padding:28px 14px;">
        <table role="presentation" width="680" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:680px;background:#ffffff;border-collapse:collapse;box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); border-radius: 6px; overflow: hidden;">
          <tr>
            <td align="center" style="background-color: #ffffff; padding:35px 28px 24px;">
              <img src="' . campaign_escape($logoUrl) . '" width="240" alt="Standarte" style="display:block;border:0;outline:none;text-decoration:none;width:240px !important;max-width:55% !important;height:auto !important;margin:0 auto 12px;" />
              <p style="color: #222222; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0; font-family: Arial, sans-serif; text-align: center;">' . campaign_escape($headerText) . '</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:40px 30px 18px; font-family: Arial, sans-serif; text-align: center;">
              <h1 style="margin:0 0 16px;font-family:Georgia,Times,serif;font-size:26px;line-height:1.2;color:#111;font-weight:normal;text-align:center;">' . campaign_escape($emailHeadline) . '</h1>
              <p style="margin:0;font-size:15px;line-height:1.65;color:#444;text-align:center;">' . htmlspecialchars($emailIntro, ENT_NOQUOTES, 'UTF-8') . '</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 6px;">
              ' . $imageHtml . '
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:4px 34px 30px;">
              ' . ($emailBody !== '' && $emailBody !== ' ' ? '<p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#333;text-align:center;">' . htmlspecialchars($emailBody, ENT_NOQUOTES, 'UTF-8') . '</p>' : '') . '
              <a href="' . campaign_escape($landingUrl) . '" style="display:inline-block;background:#ffc800;color:#000000;text-decoration:none;border-radius:30px;border:none;padding:12px 28px;font-weight:bold;font-size:13px;letter-spacing:.04em;">' . campaign_escape($emailCta) . '</a>
              <p style="margin:22px 0 0;text-align:center;"><a href="https://wa.me/34613097148" target="_blank" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;border-radius:30px;padding:12px 28px;font-weight:bold;font-size:15px;">WhatsApp +34 613 097 148</a></p>
              ' . $unsubscribeHtml . '
            </td>
          </tr>

          <tr>
            <td style="padding:18px 28px;background:#f2f2f2;text-align:center;font-size:11px;line-height:1.5;color:#777;border-top: 1px solid #e5e5e5;">
              <strong>Standarte</strong> · <a href="' . campaign_escape($siteUrl) . '" style="color:#777;text-decoration:underline;">' . campaign_escape($siteUrl) . '</a>
            </td>
          </tr>


        </table>
      </td>
    </tr>
  </table>
</body>
</html>';
}

/**
 * Email de seguimiento personal "Pat" (1 h despues de una visita registrada).
 * Misma cabecera que el multimedia, foto circular de Patricia, mensaje personal
 * traducido (con {GRUPO} = lista/feria del contacto), foto aleatoria del banco,
 * boton CTA y boton de WhatsApp. Reutiliza los helpers del mailer multimedia.
 */
function campaign_pat_texts($lang)
{
    $t = array(
        'es' => array(
            'subject' => 'Hola, soy Pat (Standarte)',
            'with'    => 'Hola, soy Pat. Gracias por visitar nuestra web. Estaríamos encantados de poder serviros como diseñadores y constructores en vuestra próxima cita en la feria {GRUPO}, o quizás en cualquier otro evento en la península ibérica. No dudes en ponerte en contacto conmigo si tienes algo en mente.',
            'without' => 'Hola, soy Pat. Gracias por visitar nuestra web. Estaríamos encantados de poder serviros como diseñadores y constructores en vuestra próxima cita ferial, o quizás en cualquier otro evento en la península ibérica. No dudes en ponerte en contacto conmigo si tienes algo en mente.',
            'bye'     => 'Nos vemos pronto,',
            'cta'     => 'Presupuesto en 24 h',
        ),
        'en' => array(
            'subject' => "Hi, I'm Pat (Standarte)",
            'with'    => "Hi, I'm Pat. Thank you for visiting our website. We would be delighted to work with you as designers and builders at your next appointment at the {GRUPO} trade fair, or perhaps at any other event in the Iberian Peninsula. Don't hesitate to get in touch with me if you have something in mind.",
            'without' => "Hi, I'm Pat. Thank you for visiting our website. We would be delighted to work with you as designers and builders at your next trade fair, or perhaps at any other event in the Iberian Peninsula. Don't hesitate to get in touch with me if you have something in mind.",
            'bye'     => 'See you soon,',
            'cta'     => 'Quote in 24 h',
        ),
        'de' => array(
            'subject' => 'Hallo, ich bin Pat (Standarte)',
            'with'    => 'Hallo, ich bin Pat. Danke, dass Sie unsere Website besucht haben. Wir würden uns sehr freuen, Ihnen als Designer und Standbauer bei Ihrem nächsten Termin auf der Messe {GRUPO} zur Seite zu stehen – oder vielleicht bei einer anderen Veranstaltung auf der Iberischen Halbinsel. Zögern Sie nicht, mich zu kontaktieren, wenn Sie etwas im Sinn haben.',
            'without' => 'Hallo, ich bin Pat. Danke, dass Sie unsere Website besucht haben. Wir würden uns sehr freuen, Ihnen als Designer und Standbauer bei Ihrer nächsten Messe zur Seite zu stehen – oder vielleicht bei einer anderen Veranstaltung auf der Iberischen Halbinsel. Zögern Sie nicht, mich zu kontaktieren, wenn Sie etwas im Sinn haben.',
            'bye'     => 'Bis bald,',
            'cta'     => 'Angebot in 24 Std.',
        ),
        'fr' => array(
            'subject' => 'Bonjour, je suis Pat (Standarte)',
            'with'    => "Bonjour, je suis Pat. Merci d'avoir visité notre site web. Nous serions ravis de vous accompagner en tant que concepteurs et constructeurs lors de votre prochain rendez-vous au salon {GRUPO}, ou peut-être lors d'un autre événement dans la péninsule Ibérique. N'hésitez pas à me contacter si vous avez un projet en tête.",
            'without' => "Bonjour, je suis Pat. Merci d'avoir visité notre site web. Nous serions ravis de vous accompagner en tant que concepteurs et constructeurs lors de votre prochain salon, ou peut-être lors d'un autre événement dans la péninsule Ibérique. N'hésitez pas à me contacter si vous avez un projet en tête.",
            'bye'     => 'À bientôt,',
            'cta'     => 'Devis en 24 h',
        ),
        'it' => array(
            'subject' => 'Ciao, sono Pat (Standarte)',
            'with'    => 'Ciao, sono Pat. Grazie per aver visitato il nostro sito web. Saremmo lieti di assistervi come designer e costruttori al vostro prossimo appuntamento alla fiera {GRUPO}, o magari in qualsiasi altro evento nella penisola iberica. Non esitate a contattarmi se avete qualcosa in mente.',
            'without' => 'Ciao, sono Pat. Grazie per aver visitato il nostro sito web. Saremmo lieti di assistervi come designer e costruttori alla vostra prossima fiera, o magari in qualsiasi altro evento nella penisola iberica. Non esitate a contattarmi se avete qualcosa in mente.',
            'bye'     => 'A presto,',
            'cta'     => 'Preventivo in 24 h',
        ),
        'pt' => array(
            'subject' => 'Olá, sou a Pat (Standarte)',
            'with'    => 'Olá, sou a Pat. Obrigada por visitar o nosso site. Teríamos todo o gosto em trabalhar convosco como designers e construtores no vosso próximo compromisso na feira {GRUPO}, ou talvez em qualquer outro evento na Península Ibérica. Não hesite em entrar em contacto comigo se tiver algo em mente.',
            'without' => 'Olá, sou a Pat. Obrigada por visitar o nosso site. Teríamos todo o gosto em trabalhar convosco como designers e construtores na vossa próxima feira, ou talvez em qualquer outro evento na Península Ibérica. Não hesite em entrar em contacto comigo se tiver algo em mente.',
            'bye'     => 'Até breve,',
            'cta'     => 'Orçamento em 24 h',
        ),
        'zh' => array(
            'subject' => '您好，我是 Pat（Standarte）',
            'with'    => '您好，我是 Pat。感谢您访问我们的网站。我们非常乐意作为设计与搭建团队，在您下一次参加 {GRUPO} 展会时为您服务，或在伊比利亚半岛的任何其他活动中与您合作。如果您有任何想法，欢迎随时与我联系。',
            'without' => '您好，我是 Pat。感谢您访问我们的网站。我们非常乐意作为设计与搭建团队，在您下一次参展时为您服务，或在伊比利亚半岛的任何其他活动中与您合作。如果您有任何想法，欢迎随时与我联系。',
            'bye'     => '期待很快与您相见，',
            'cta'     => '24小时内报价',
        ),
        'hi' => array(
            'subject' => 'नमस्ते, मैं Pat हूँ (Standarte)',
            'with'    => 'नमस्ते, मैं Pat हूँ। हमारी वेबसाइट देखने के लिए धन्यवाद। हमें आपकी अगली {GRUPO} प्रदर्शनी में, या इबेरियन प्रायद्वीप के किसी अन्य आयोजन में, डिज़ाइनर और निर्माता के रूप में आपके साथ काम करके बहुत खुशी होगी। यदि आपके मन में कुछ है तो मुझसे संपर्क करने में संकोच न करें।',
            'without' => 'नमस्ते, मैं Pat हूँ। हमारी वेबसाइट देखने के लिए धन्यवाद। हमें आपकी अगली प्रदर्शनी में, या इबेरियन प्रायद्वीप के किसी अन्य आयोजन में, डिज़ाइनर और निर्माता के रूप में आपके साथ काम करके बहुत खुशी होगी। यदि आपके मन में कुछ है तो मुझसे संपर्क करने में संकोच न करें।',
            'bye'     => 'जल्द मिलते हैं,',
            'cta'     => '24 घंटे में कोटेशन',
        ),
        'ko' => array(
            'subject' => '안녕하세요, Pat입니다 (Standarte)',
            'with'    => '안녕하세요, Pat입니다. 저희 웹사이트를 방문해 주셔서 감사합니다. 다가오는 {GRUPO} 박람회에서, 혹은 이베리아 반도의 다른 어떤 행사에서든 디자이너이자 시공자로서 여러분과 함께할 수 있다면 매우 기쁘겠습니다. 염두에 두신 것이 있으시면 언제든 저에게 연락 주세요.',
            'without' => '안녕하세요, Pat입니다. 저희 웹사이트를 방문해 주셔서 감사합니다. 다가오는 박람회에서, 혹은 이베리아 반도의 다른 어떤 행사에서든 디자이너이자 시공자로서 여러분과 함께할 수 있다면 매우 기쁘겠습니다. 염두에 두신 것이 있으시면 언제든 저에게 연락 주세요.',
            'bye'     => '곧 뵙겠습니다,',
            'cta'     => '24시간 내 견적',
        ),
        'ja' => array(
            'subject' => 'こんにちは、Pat です（Standarte）',
            'with'    => 'こんにちは、Pat です。私たちのウェブサイトをご覧いただきありがとうございます。次回の {GRUPO} 展示会、あるいはイベリア半島での他のイベントにおいて、デザイナーおよび施工者として皆さまと一緒にお仕事ができれば大変うれしく思います。何かお考えのことがございましたら、お気軽にご連絡ください。',
            'without' => 'こんにちは、Pat です。私たちのウェブサイトをご覧いただきありがとうございます。次回の展示会、あるいはイベリア半島での他のイベントにおいて、デザイナーおよび施工者として皆さまと一緒にお仕事ができれば大変うれしく思います。何かお考えのことがございましたら、お気軽にご連絡ください。',
            'bye'     => '近いうちにお会いしましょう、',
            'cta'     => '24時間で見積もり',
        ),
    );
    return isset($t[$lang]) ? $t[$lang] : $t['es'];
}

function campaign_build_pat_email($config, $recipientEmail, $lang, $grupo = '')
{
    $siteUrl = rtrim($config['site_url'], '/');
    $landingUrl = campaign_tracking_url($config, $recipientEmail);
    $logoUrl = $siteUrl . '/img/logo_stand-arte_negro.svg';
    $patUrl = $siteUrl . '/img/team/patricia_circle.jpg';
    $phone = campaign_escape($config['phone']);
    $htmlLang = isset($config['languages'][$lang]['html']) ? $config['languages'][$lang]['html'] : 'es';
    $footerText = isset($config['footer_text'][$lang]) ? $config['footer_text'][$lang] : $config['footer_text']['es'];
    $headerText = isset($config['header_text'][$lang]) ? $config['header_text'][$lang] : $config['header_text']['es'];

    $texts = campaign_pat_texts($lang);
    $grupo = trim((string) $grupo);
    if ($grupo !== '') {
        $message = str_replace('{GRUPO}', $grupo, $texts['with']);
    } else {
        $message = $texts['without'];
    }
    $subject = $texts['subject'];

    // Firma legal / baja (misma logica que el multimedia)
    $configFile = dirname(dirname(__DIR__)) . '/supabase-config.php';
    if (!is_file($configFile)) {
        $configFile = dirname(dirname(dirname(__DIR__))) . '/supabase-config.php';
    }
    if (is_file($configFile)) {
        require_once $configFile;
    }
    $unsubscribeHtml = '';
    if (defined('UNSUBSCRIBE_SECRET_SALT')) {
        $emailBase64 = base64_encode($recipientEmail);
        $unsubToken = md5($recipientEmail . UNSUBSCRIBE_SECRET_SALT);
        $unsubscribeLink = $siteUrl . '/unsubscribe.php?email=' . urlencode($emailBase64) . '&token=' . urlencode($unsubToken);
        $unsubLabels = array(
            'en' => 'If you do not want to receive these emails, you can <a href="%s" target="_blank" style="color:#b89400;text-decoration:underline;font-weight:bold;">unsubscribe here</a>.',
            'de' => 'Wenn Sie keine weiteren E-Mails erhalten möchten, können Sie sich <a href="%s" target="_blank" style="color:#b89400;text-decoration:underline;font-weight:bold;">hier abmelden</a>.',
            'pt' => 'Se não deseja receber mais estes e-mails, pode <a href="%s" target="_blank" style="color:#b89400;text-decoration:underline;font-weight:bold;">cancelar a inscrição aqui</a>.',
            'es' => 'En cumplimiento de la LSSI-CE y el RGPD, si no deseas recibir más correos, puedes <a href="%s" target="_blank" style="color:#b89400;text-decoration:underline;font-weight:bold;">darte de baja haciendo clic aquí</a>.',
        );
        $label = isset($unsubLabels[$lang]) ? $unsubLabels[$lang] : $unsubLabels['es'];
        $unsubscribeHtml = '<p style="margin:16px 0 0;font-size:12px;line-height:1.5;color:#777;text-align:center;">' . sprintf($label, campaign_escape($unsubscribeLink)) . '</p>';
    }

    // Foto aleatoria del banco multimedia
    $imageHtml = '';
    if (isset($config['categories']['stands_madera']['images']) && count($config['categories']['stands_madera']['images'])) {
        $imagesList = $config['categories']['stands_madera']['images'];
        shuffle($imagesList);
        $img = $imagesList[0];
        $imageHtml = '<a href="' . campaign_escape($landingUrl) . '" style="display:block;text-decoration:none;border:0;margin:0;">'
            . '<img src="' . campaign_escape(campaign_absolute_url($config, $img['src'])) . '" width="680" alt="' . campaign_escape($img['alt']) . '" style="display:block;width:100%;max-width:680px;height:auto;border:0;margin:0 auto;" />'
            . '</a>';
    }

    $messageHtml = htmlspecialchars($message, ENT_NOQUOTES, 'UTF-8');
    $byeHtml = campaign_escape($texts['bye']);

    return '<!doctype html>
<html lang="' . campaign_escape($htmlLang) . '">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>' . campaign_escape($subject) . '</title>
</head>
<body style="margin:0;padding:0;background:#f7f6f1;color:#252525;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f7f6f1;margin:0;padding:0;">
    <tr>
      <td align="center" style="padding:28px 14px;">
        <table role="presentation" width="680" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:680px;background:#ffffff;border-collapse:collapse;box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); border-radius: 6px; overflow: hidden;">
          <tr>
            <td align="center" style="background-color: #ffffff; padding:35px 28px 24px;">
              <img src="' . campaign_escape($logoUrl) . '" width="240" alt="Standarte" style="display:block;border:0;outline:none;text-decoration:none;width:240px !important;max-width:55% !important;height:auto !important;margin:0 auto 12px;" />
              <p style="color: #222222; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0; font-family: Arial, sans-serif; text-align: center;">' . campaign_escape($headerText) . '</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:24px 30px 6px; text-align:center;">
              <img src="' . campaign_escape($patUrl) . '" width="150" height="150" alt="Patricia Jiménez — Standarte" style="display:block;width:150px;height:150px;max-width:150px;border-radius:50%;border:0;outline:none;margin:0 auto 10px;" />
              <p style="margin:0;font-size:15px;font-weight:bold;color:#111;text-align:center;">Patricia Jiménez</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:14px 34px 6px; text-align:center;">
              <p style="margin:0 0 18px;font-size:16px;line-height:1.75;color:#333;text-align:center;">' . $messageHtml . '</p>
              <p style="margin:0;font-size:16px;line-height:1.75;color:#333;text-align:center;">' . $byeHtml . '<br><strong>Pat ;-)</strong></p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 0 6px;">
              ' . $imageHtml . '
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:4px 34px 30px;">
              <a href="' . campaign_escape($landingUrl) . '" style="display:inline-block;background:#ffc800;color:#000000;text-decoration:none;border-radius:30px;border:none;padding:12px 28px;font-weight:bold;font-size:13px;letter-spacing:.04em;">' . campaign_escape($texts['cta']) . '</a>
              <p style="margin:22px 0 0;text-align:center;"><a href="https://wa.me/34613097148" target="_blank" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;border-radius:30px;padding:12px 28px;font-weight:bold;font-size:15px;">WhatsApp +34 613 097 148</a></p>
              ' . $unsubscribeHtml . '
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px;background:#f2f2f2;text-align:center;font-size:11px;line-height:1.5;color:#777;border-top: 1px solid #e5e5e5;">
              <strong>Standarte</strong> · <a href="' . campaign_escape($siteUrl) . '" style="color:#777;text-decoration:underline;">' . campaign_escape($siteUrl) . '</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>';
}
