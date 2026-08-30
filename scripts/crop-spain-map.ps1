Add-Type -AssemblyName System.Drawing
$root = Join-Path $PSScriptRoot '..'
$src = Join-Path $root 'assets\destinos\world-map-premium.jpg'
$dst = Join-Path $root 'assets\destinos\spain-map.jpg'
$bmp = [System.Drawing.Bitmap]::FromFile($src)
$w = $bmp.Width
$h = $bmp.Height
# Iberia: lon -9.5 a 4.5, lat 36 a 44.5 sobre mapa equirectangular
$cropX = [int](($w * (-9.5 + 180)) / 360)
$cropW = [int](($w * 14) / 360)
$cropY = [int](($h * (90 - 44.5)) / 180)
$cropH = [int](($h * (44.5 - 36)) / 180)
$targetW = 1000
$targetH = 1200
$destRect = New-Object System.Drawing.Rectangle 0, 0, $targetW, $targetH
$srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
$cropped = New-Object System.Drawing.Bitmap $targetW, $targetH
$g = [System.Drawing.Graphics]::FromImage($cropped)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$bmp.Dispose()
$cropped.Save($dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cropped.Dispose()
Write-Output "crop at $cropX,$cropY size ${cropW}x${cropH}"
