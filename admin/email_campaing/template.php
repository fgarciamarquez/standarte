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

function campaign_tracking_url($config)
{
    return rtrim($config['site_url'], '/') . '/email-track.php?from=email_campaing';
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
            // If the placeholder is NOT "EMPRESA" (case-insensitive), it means it's a custom company name!
            if (strcasecmp($placeholder, 'EMPRESA') !== 0) {
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
        default:
            return 'su empresa';
    }
}

function campaign_process_placeholders($text, $companyName)
{
    // 1. Reemplazar {EMPRESA} (fase insensible) por el nombre de la empresa resuelto
    $text = preg_replace('/\{EMPRESA\}/i', $companyName, $text);

    // 2. Limpiar cualquier otro bracket personalizado (ej. {Zayer} -> Zayer)
    $text = preg_replace('/\{([^{}]+)\}/', '$1', $text);

    return $text;
}

function campaign_build_email($config, $category, $recipientEmail, $lang, $subject = '', $introOverride = '', $bodyOverride = '', $companyName = '')
{
    $siteUrl = rtrim($config['site_url'], '/');
    $landingUrl = campaign_tracking_url($config);
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
    $selectedImages = array_slice($imagesList, 0, 2);
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
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#333;text-align:center;">' . htmlspecialchars($emailBody, ENT_NOQUOTES, 'UTF-8') . '</p>
              <a href="' . campaign_escape($landingUrl) . '" style="display:inline-block;background:#ffc800;color:#000000;text-decoration:none;border-radius:30px;padding:12px 28px;font-weight:bold;font-size:13px;letter-spacing:.04em;text-transform:uppercase;">' . campaign_escape($emailCta) . '</a>
              <p style="margin:24px 0 0;font-size:22px;line-height:1.35;color:#111;font-weight:bold;text-align:center;">' . $phone . '</p>
              ' . $unsubscribeHtml . '
            </td>
          </tr>

          <tr>
            <td style="padding:18px 28px;background:#f2f2f2;text-align:center;font-size:11px;line-height:1.5;color:#777;border-top: 1px solid #e5e5e5;">
              <strong>Standarte</strong> · <a href="' . campaign_escape($siteUrl) . '" style="color:#777;text-decoration:underline;">' . campaign_escape($siteUrl) . '</a><br>
              ' . campaign_escape($footerText) . ' ' . $phone . '.
            </td>
          </tr>


        </table>
      </td>
    </tr>
  </table>
</body>
</html>';
}
