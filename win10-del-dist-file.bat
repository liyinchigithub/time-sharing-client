@echo on
for /r %%f in (*.html) do del %%f
for /r %%f in (*.ico) do del %%f
cd /d D:
rmdir /s /q static
@echo copy
xcopy /e /q /h /r /y D:\�Զ���\time-sharing-merchants\dist\static D:\�Զ���\pms\PMS\static
xcopy /e /q /h /r /y D:\�Զ���\time-sharing-merchants\dist\favicon.ico  D:\�Զ���\pms\PMS
xcopy /e /q /h /r /y D:\�Զ���\time-sharing-merchants\dist\index.html  D:\�Զ���\pms\PMS
xcopy /e /q /h /r /y D:\�Զ���\time-sharing-merchants\dist\report.html D:\�Զ���\pms\PMS
pause
