# MS_DB_UI

$files = @(
    "app.js",
    "firebase-init.js",
    "index.html",
    "style.css"
)

$outfile = "selected-files.txt" 

if (Test-Path $outfile) { Remove-Item $outfile }

foreach ($file in $files) {
    "[${file}]" | Out-File -FilePath $outfile -Encoding utf8 -Append
    Get-Content $file -Encoding utf8 | Out-File -FilePath $outfile -Encoding utf8 -Append
    "" | Out-File -FilePath $outfile -Encoding utf8 -Append
    "" | Out-File -FilePath $outfile -Encoding utf8 -Append
}