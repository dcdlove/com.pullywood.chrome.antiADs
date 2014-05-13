@echo off
call clr.bat
for /f %%a in ('dir /b .\source\*.swf') do @copy /Y .\source\%%a .\temp\%%a
for /f %%a in ('dir /b .\temp\*.swf') do @abcexport .\temp\%%a
for /f %%a in ('dir /b .\temp\*.abc') do @rabcdasm .\temp\%%a
REM for /f "delims=" %%a in ('dir/s/b .\temp\*.asasm') do @echo "%%a">>.\temp\asasm.asasm & type "%%a">>.\temp\asasm.asasm
