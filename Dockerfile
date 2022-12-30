FROM debian:stable-slim

WORKDIR /var/www/html

RUN apt-get -qq update \
  && apt-get -qq -y install curl zip unzip \
  && curl -fsSL https://deno.land/x/install/install.sh | sh \
  && apt-get -qq remove curl zip unzip \
  && apt-get -qq remove --purge -y curl zip unzip \
  && apt-get -qq -y autoremove \
  && apt-get -qq clean \
  && echo 'export DENO_INSTALL="/root/.deno"' >> ~/.bash_profile \
  && echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> ~/.bash_profile

RUN /bin/bash -c source ~/.bash_profile && bash

# CMD ["/bin/bash", "-c", "source ~/.bash_profile && bash"]

ENTRYPOINT [ "deno", "run", "-A", "main.ts" ]
