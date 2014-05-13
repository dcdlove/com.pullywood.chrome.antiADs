@echo off
for /f %%a in ('dir /b .\export\*') do @copy /Y .\export\%%a ..\..\antiADs\flashes\letv\%%a

