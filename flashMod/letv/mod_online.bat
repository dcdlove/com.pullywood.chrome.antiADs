@echo off
call mod.bat
xcopy /EYV .\patch_online\LetvPlayer-0 .\temp\
xcopy /EYV .\patch_online\SSDKLetvPlayer-0 .\temp\
xcopy /EYV .\patch_online\swfPlayer-0 .\temp\
for /f %%a in ('dir /b .\patch_online\*.xml') do @copy /Y .\patch_online\%%a .\export\%%a








