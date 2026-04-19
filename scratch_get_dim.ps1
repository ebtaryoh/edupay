Add-Type -AssemblyName System.Drawing
$filePath = "c:\Users\HP\Desktop\DEV-APPS\edu-pay-project-master\src\assets\dashboard\Products 2.png"
$img = [System.Drawing.Image]::FromFile($filePath)
Write-Output "Width: $($img.Width), Height: $($img.Height)"
$img.Dispose()
