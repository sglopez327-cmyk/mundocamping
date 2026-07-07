$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$site = 'https://www.mundocamping.net'
$defaultImage = "$site/Fondo.jpg"

$pageMap = @{
  'index.html' = @{ canonical = "$site/"; ogType = 'website' }
  'tiendas.html' = @{ canonical = "$site/tiendas" }
  'sacos.html' = @{ canonical = "$site/sacos" }
  'esterillas.html' = @{ canonical = "$site/esterillas" }
  'baterias.html' = @{ canonical = "$site/baterias" }
  'iluminacion/index.html' = @{ canonical = "$site/iluminacion/" }
  'herramientas.html' = @{ canonical = "$site/herramientas" }
  'accesorios.html' = @{ canonical = "$site/accesorios" }
  'cocina.html' = @{ canonical = "$site/cocina" }
  'top-5-sacos-dormir.html' = @{ canonical = "$site/top-5-sacos-dormir"; image = "$site/assets/sacos-dormir-colores-bosque-pinos.png" }
  'top-5-esterillas.html' = @{ canonical = "$site/top-5-esterillas"; image = "$site/assets/esterillas-colchoneta-tienda-camping-realista.png" }
  'top-5-tiendas-familia.html' = @{ canonical = "$site/top-5-tiendas-familia"; image = "$site/assets/familia-tienda-campana-bosque-pinos-bullterrier.png" }
  'top-5-tiendas-parejas.html' = @{ canonical = "$site/top-5-tiendas-parejas"; image = "$site/assets/pareja-tienda-campana-bosque-amstaff.png" }
  'multiherramientas.html' = @{ canonical = "$site/multiherramientas"; image = "$site/assets/multiherramientas-tronco-pino-bosque.png" }
  'linternas-cual-comprar.html' = @{ canonical = "$site/linternas-cual-comprar"; image = "$site/assets/linternas-cual-comprar-indeciso.png" }
  'estaciones-energia.html' = @{ canonical = "$site/estaciones-energia"; image = "$site/assets/estaciones-energia-portatiles-bosque-pinos.png" }
  'accesorios-marcan-diferencia.html' = @{ canonical = "$site/accesorios-marcan-diferencia"; image = "$site/assets/accesorios-mochila-gps-cerillas-bosque.png" }
  'sobre-mi.html' = @{ canonical = "$site/sobre-mi"; image = "$site/assets/sobre-mi-hero-noche.jpg" }
  'contacto.html' = @{ canonical = "$site/contacto" }
  'privacidad.html' = @{ canonical = "$site/privacidad" }
  'aviso-legal.html' = @{ canonical = "$site/aviso-legal" }
}

function Get-PageMetaBlock {
  param(
    [string]$Title,
    [string]$Description,
    [string]$Canonical,
    [string]$OgType,
    [string]$Image
  )

  $safeTitle = [System.Security.SecurityElement]::Escape($Title)
  $safeDesc = [System.Security.SecurityElement]::Escape($Description)

  return @"
    <link rel="canonical" href="$Canonical" />
    <meta property="og:type" content="$OgType" />
    <meta property="og:site_name" content="Mundo Camping" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:title" content="$safeTitle" />
    <meta property="og:description" content="$safeDesc" />
    <meta property="og:url" content="$Canonical" />
    <meta property="og:image" content="$Image" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="$safeTitle" />
    <meta name="twitter:description" content="$safeDesc" />
    <meta name="twitter:image" content="$Image" />
"@
}

function Remove-ExistingSeoBlock {
  param([string]$Content)

  $Content = $Content -replace '(?ms)\s*<link rel="canonical"[^>]*>\s*', "`n"
  $Content = $Content -replace '(?ms)\s*<meta property="og:[^"]+"[^>]*>\s*', ''
  $Content = $Content -replace '(?ms)\s*<meta name="twitter:[^"]+"[^>]*>\s*', ''
  return $Content
}

foreach ($relativePath in $pageMap.Keys) {
  $filePath = Join-Path $root $relativePath
  if (-not (Test-Path $filePath)) {
    Write-Warning "Skip missing: $relativePath"
    continue
  }

  $meta = $pageMap[$relativePath]
  $content = Get-Content -Path $filePath -Raw -Encoding UTF8
  $content = Remove-ExistingSeoBlock -Content $content

  if ($content -notmatch '<title>([^<]+)</title>') {
    Write-Warning "No title in $relativePath"
    continue
  }
  $title = $Matches[1].Trim()

  $description = ''
  if ($content -match '<meta\s+name="description"\s+content="([^"]*)"') {
    $description = $Matches[1]
  } elseif ($content -match '<meta\s+name="description"\s+content=\s*"([^"]*)"') {
    $description = $Matches[1]
  }

  $canonical = $meta.canonical
  $ogType = if ($meta.ogType) { $meta.ogType } else { 'article' }
  $image = if ($meta.image) { $meta.image } else { $defaultImage }
  $block = Get-PageMetaBlock -Title $title -Description $description -Canonical $canonical -OgType $ogType -Image $image

  if ($content -match '(?ms)(<title>[^<]+</title>)') {
    $content = $content -replace '(?ms)(<title>[^<]+</title>)', "`$1`n$block"
  }

  Set-Content -Path $filePath -Value $content -Encoding UTF8 -NoNewline
  Write-Host "Updated SEO head: $relativePath"
}

Write-Host 'Done.'
