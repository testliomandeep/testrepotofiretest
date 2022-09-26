# /bin/sh
zip -r tests.zip . -x "node_modules/*" -x ".idea/*" -x "/allure-results" -x ".git" -x "package-lock.json"