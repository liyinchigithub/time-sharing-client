@echo on
for /r %%f in (*.html) do del %%f
for /r %%f in (*.ico) do del %%f
cd /d D:
rmdir /s /q static
@echo copy
xcopy /e /q /h /r /y D:\自动化\time-sharing-merchants\dist\static D:\自动化\pms\PMS\static
xcopy /e /q /h /r /y D:\自动化\time-sharing-merchants\dist\favicon.ico  D:\自动化\pms\PMS
xcopy /e /q /h /r /y D:\自动化\time-sharing-merchants\dist\index.html  D:\自动化\pms\PMS
xcopy /e /q /h /r /y D:\自动化\time-sharing-merchants\dist\report.html D:\自动化\pms\PMS
pause
