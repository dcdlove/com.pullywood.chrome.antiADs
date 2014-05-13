@echo off
xcopy /EYV .\patch\LetvPlayer-0 .\temp\
xcopy /EYV .\patch\SSDKLetvPlayer-0 .\temp\
xcopy /EYV .\patch\swfPlayer-0 .\temp\
for /f %%a in ('dir /b .\patch\*.xml') do @copy /Y .\patch\%%a .\export\%%a








