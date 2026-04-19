Add-Type -AssemblyName System.Drawing
$filePath = "c:\Users\HP\Desktop\DEV-APPS\edu-pay-project-master\src\assets\dashboard\Products 2.png"
$img = [System.Drawing.Image]::FromFile($filePath)
$bmp = new-object System.Drawing.Bitmap($img)
$pixel = $bmp.GetPixel(0,0)
$hex = "#{0:X2}{1:X2}{2:X2}" -f $pixel.R, $pixel.G, $pixel.B
Write-Output "HEX: $hex"
$bmp.Dispose()
$img.Dispose()
