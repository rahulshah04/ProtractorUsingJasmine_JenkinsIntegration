set Pathname = "CI_Grunt"
cd /d %Pathname %
@echo off
title Command Executer
color 1b

echo #######################################
echo Command Executer by: Rahul Shah
echo #######################################
echo Test Case Exceution is Started
call grunt testSampleTest
