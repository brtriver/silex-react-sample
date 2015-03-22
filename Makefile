PHP_BIN:=$(shell which php)
CURL_BIN:=$(shell which curl)
NPM:=$(shell which npm)
BOWER:=$(shell pwd)/node_modules/bower/bin/bower
JSX:=$(shell pwd)/node_modules/react-tools/bin/jsx
PHPUNIT:=phpunit.phar

setup: composer.phar phpunit.phar dbup.phar

composer.phar:
	$(PHP_BIN) -r "eval('?>'.file_get_contents('https://getcomposer.org/installer'));"

phpunit.phar:
	$(CURL_BIN) -SsLO https://phar.phpunit.de/phpunit.phar

dbup.phar:
	$(CURL_BIN) -SsLO https://github.com/brtriver/dbup/raw/master/dbup.phar

.dbup/properties.ini:
	@echo "[dbup] copy dist file. fix your env"
	cp .dbup/properties.ini.dist .dbup/properties.ini

install: .dbup/properties.ini
	$(PHP_BIN) composer.phar install
	$(NPM) install
	$(BOWER) install

init-db:
	$(PHP_BIN) dbup.phar up

server:
	$(PHP_BIN) -S localhost:8888 -t ./web

test:
	$(PHP_BIN) $(PHPUNIT) --tap --colors ./tests

jsx:
	$(JSX) --watch src/js/ web/build/
