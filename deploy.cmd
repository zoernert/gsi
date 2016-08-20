@echo off
start testrpc
solc --bin --abi --optimize -o build contracts\contract.sol
echo Wait for testRPC to be fired up
pause 
node js\deploy.js
copy build\*.abi web\build\
copy current.deployment.json web\js\