echo  '<!doctype html><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf8"/></head><body>' > result.html
node testrunner.js >> result.html
echo '</body></html>' >> result.html
