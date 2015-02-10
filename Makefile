APP = ./app
BIN = $(APP)/node_modules/.bin

.PHONY: install bootstrap start;

install: $(APP)/package.json
	@cd $(APP); npm install;

bootstrap: $(BIN)/lessc
	@$(BIN)/lessc $(APP)/main.less $(APP)/main.css
	@cd $(APP); ./make_js;

start: 
	@cd $(APP); ./web-server.js;
