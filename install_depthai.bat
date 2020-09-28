@echo off
reg query "hkcu\software\Python" >nul 2>nul
if ERRORLEVEL 1 GOTO NOPYTHON  
goto :HASPYTHON  
:NOPYTHON  
echo Python is not installed on your system.
echo Now the script will download installer to perform Python installation
echo [91mRemember to select option to add Python to the system PATH[0m
set /p DUMMY=Hit ENTER to download Python installer...
powershell -Command "Invoke-WebRequest https://www.python.org/ftp/python/3.8.5/python-3.8.5-amd64.exe -OutFile python3install.exe"
start "" python3install.exe
set /p DUMMY=Hit ENTER when python is installed...
reg query "hkcu\software\Python"
if ERRORLEVEL 1 GOTO FAILED
goto :HASPYTHON
:FAILED
set /p DUMMY=Python install has failed, please contact us at support@luxonis.com and hit ENTER to exit...
exit /b 1
:HASPYTHON
where /q cmake
if ERRORLEVEL 1 (
    echo CMake is not installed. 
    echo [91mRemember to select option to add CMake to the system PATH[0m
    set /p DUMMY=Hit ENTER to start downloading CMake installer...
    powershell -Command "Invoke-WebRequest https://github.com/Kitware/CMake/releases/download/v3.18.3/cmake-3.18.3-win64-x64.msi -OutFile cmakeinstall.msi"
    start "" cmakeinstall.msi
    set /p DUMMY=Hit ENTER when CMake is installed...
)
echo Python was detected, installing required packages and the DepthAI library...
@echo on
py -m pip install --upgrade pip
pause
py -c "import cv2;import depthai"
pause