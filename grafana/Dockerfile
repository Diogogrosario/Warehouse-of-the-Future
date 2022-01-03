FROM grafana/grafana:8.2.6-ubuntu

# Disable Login form or not
ENV GF_AUTH_DISABLE_LOGIN_FORM "true"
# Allow anonymous authentication or not
ENV GF_AUTH_ANONYMOUS_ENABLED "true"
# Role of anonymous user
ENV GF_AUTH_ANONYMOUS_ORG_ROLE "Admin"
# Install plugins here our in your own config file
# ENV GF_INSTALL_PLUGINS="<list of plugins seperated by ,"
ENV GF_INSTALL_PLUGINS https://github.com/yesoreyeram/grafana-infinity-datasource/releases/download/v0.8.0/yesoreyeram-infinity-datasource-0.8.0.zip;yesoreyeram-infinity-datasource,grafana-worldmap-panel,grafana-clock-panel,yesoreyeram-boomtheme-panel,yesoreyeram-boomtable-panel,https://github.com/yesoreyeram/yesoreyeram-boomsummary-panel/archive/deecb03210355a7ddd1dfca00474b0bcc28b9b4a.zip;yesoreyeram-boomsummary-panel,https://github.com/yesoreyeram/grafana-boomcomments-panel/archive/2bcba5987e930f18c64e4b648ce49a01639ded8f.zip;yesoreyeram-boomcomments-panel,https://github.com/yesoreyeram/grafana-infinity-panel/archive/90648a35cb87948b27bc6a28f5308b21f1b0880c.zip;yesoreyeram-infinity-panel

# Add provisioning
ADD ./provisioning /etc/grafana/provisioning
# Add configuration file
ADD ./grafana.ini /etc/grafana/grafana.ini
# Add dashboard json files
ADD ./dashboards /etc/grafana/dashboards