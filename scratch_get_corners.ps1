Add-Type -AssemblyName System.Drawing
$filePath = "c:\Users\HP\Desktop\DEV-APPS\edu-pay-project-master\src\assets\dashboard\Products 2.png"
$img = [System.Drawing.Image]::FromFile($filePath)
$bmp = new-object System.Drawing.Bitmap($img)

$w = $bmp.Width
$h = $bmp.Height

$tl = $bmp.GetPixel(0,0)
$tr = $bmp.GetPixel($w - 1, 0)
$bl = $bmp.GetPixel(0, $h - 1)
$br = $bmp.GetPixel($w - 1, $h - 1)
$leftEdgeCenter = $bmp.GetPixel(0, [math]::Round($h / 2))

Write-Output "TopLeft:     #{0:X2}{1:X2}{2:X2}" -f $tl.R, $tl.G, $tl.B
Write-Output "TopRight:    #{0:X2}{1:X2}{2:X2}" -f $tr.R, $tr.G, $tr.B
Write-Output "BottomLeft:  #{0:X2}{1:X2}{2:X2}" -f $bl.R, $bl.G, $bl.B
Write-Output "BottomRight: #{0:X2}{1:X2}{2:X2}" -f $br.R, $br.G, $br.B
Write-Output "LeftCenter:  #{0:X2}{1:X2}{2:X2}" -f $leftEdgeCenter.R, $leftEdgeCenter.G, $leftEdgeCenter.B

$bmp.Dispose()
$img.Dispose()
