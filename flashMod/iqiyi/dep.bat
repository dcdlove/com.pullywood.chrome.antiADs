@echo off
for /f %%a in ('dir /b .\export\*.swf') do @copy /Y .\export\%%a ..\..\antiADs\flashes\iqiyi\%%a

