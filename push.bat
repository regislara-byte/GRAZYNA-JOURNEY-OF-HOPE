@echo off
title GRAZYNA JOURNEY OF HOPE PUSH

echo.
echo ==========================================
echo      GRAZYNA JOURNEY OF HOPE PUSH
echo ==========================================
echo.

git status

echo.
set /p msg=Commit Message:

echo.
echo [1/5] Adding files...
git add .

echo.
echo [2/5] Commit...
git commit -m "%msg%"

echo.
echo [3/5] Push...
git push

echo.
echo [4/5] Opening Repo...
start https://github.com/regislara-byte/GRAZYNA-JOURNEY-OF-HOPE

echo.
echo [5/5] Opening Live Page...
start https://regislara-byte.github.io/GRAZYNA-JOURNEY-OF-HOPE/

echo.
echo ==========================================
echo         PUSH COMPLETE
echo ==========================================
pause