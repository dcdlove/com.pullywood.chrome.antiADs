@echo off
for /f %%a in ('dir /b .\temp\*.swf') do @rabcasm .\temp\%%~na-0\%%~na-0.main.asasm
for /f %%a in ('dir /b .\temp\*.swf') do @abcreplace .\temp\%%a 0 .\temp\%%~na-0\%%~na-0.main.abc
for /f %%a in ('dir /b .\temp\*.swf') do @copy /Y .\temp\%%a .\export\%%a

xcopy /s /y .\source\copy\* .\export\
