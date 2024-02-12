:: This file was made by anusO1#6969
@echo off
for %%I in (.) do set CurrDirName=%%~nxI
title %CurrDirName% 

node -v

echo --------------------------------
echo 1. Start
echo 2. Install
echo Select one: 
set /p selection=
if %selection% == 1 goto main
if %selection% == 2 goto install

:main
node --no-deprecation --no-warnings index.js
echo Restarting Bot..
timeout 60
goto main

:install
echo Installing bot dependencies...
npm i