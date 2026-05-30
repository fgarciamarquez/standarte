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

function campaign_build_email($config, $category, $recipientEmail, $lang, $subject = '', $introOverride = '', $bodyOverride = '', $companyName = '')
{
    $siteUrl = rtrim($config['site_url'], '/');
    $landingUrl = campaign_tracking_url($config);
    $logoUrl = $siteUrl . '/img/logo_stand-arte_negro.svg';
    $phone = campaign_escape($config['phone']);
    $email = campaign_escape($recipientEmail);
    $htmlLang = isset($config['languages'][$lang]['html']) ? $config['languages'][$lang]['html'] : 'es';
    $footerText = isset($config['footer_text'][$lang]) ? $config['footer_text'][$lang] : $config['footer_text']['es'];

    // Resolve the actual company name to use
    $resolvedCompanyName = trim($companyName);
    if ($resolvedCompanyName === '') {
        switch ($lang) {
            case 'en':
                $resolvedCompanyName = 'your company';
                break;
            case 'de':
                $resolvedCompanyName = 'Ihr Unternehmen';
                break;
            case 'pt':
                $resolvedCompanyName = 'sua empresa';
                break;
            default:
                $resolvedCompanyName = 'su empresa';
                break;
        }
    }

    $rawSubject = $subject !== '' ? $subject : campaign_text($category, $lang, 'subject');
    if ($subject !== '' && stripos($rawSubject, '{EMPRESA}') === false && stripos($rawSubject, $resolvedCompanyName) === false) {
        $rawSubject = '{EMPRESA}: ' . $rawSubject;
    }
    $emailTitle = str_replace('{EMPRESA}', $resolvedCompanyName, $rawSubject);

    $rawIntro = $introOverride !== '' ? $introOverride : campaign_text($category, $lang, 'intro');
    $emailIntro = str_replace('{EMPRESA}', $resolvedCompanyName, $rawIntro);

    $rawBody = $bodyOverride !== '' ? $bodyOverride : campaign_text($category, $lang, 'body');
    $emailBody = str_replace('{EMPRESA}', $resolvedCompanyName, $rawBody);

    $emailHeadline = str_replace('{EMPRESA}', $resolvedCompanyName, campaign_text($category, $lang, 'headline'));
    $emailCta = str_replace('{EMPRESA}', $resolvedCompanyName, campaign_text($category, $lang, 'cta'));

    $imageHtml = '';
    foreach ($category['images'] as $image) {
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
              <p style="color: #222222; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0; font-family: Arial, sans-serif; text-align: center;">Diseño y Construcción de Stands Internacionales</p>
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
              <a href="' . campaign_escape($landingUrl) . '" style="display:inline-block;background:#222222;color:#ffffff;text-decoration:none;border-radius:30px;border: 2px solid #ffc800;padding:12px 28px;font-weight:bold;font-size:13px;letter-spacing:.04em;text-transform:uppercase;">' . campaign_escape($emailCta) . '</a>
              <p style="margin:24px 0 0;font-size:22px;line-height:1.35;color:#111;font-weight:bold;text-align:center;">' . $phone . '</p>
              <p style="margin:8px 0 0;font-size:12px;line-height:1.5;color:#777;text-align:center;">Mensaje enviado a ' . $email . ' desde el gestor privado de Standarte.</p>
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
