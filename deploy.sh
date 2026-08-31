#!/usr/bin/env bash
#
# Deploy do site para a hospedagem via FTPS explícito.
#
#   ./deploy.sh          -> build + envio
#   ./deploy.sh --skip-build   -> envia o dist/ que já existe
#
# A senha é digitada na hora e nunca fica salva em disco ou no histórico.
#
set -euo pipefail

FTP_HOST="ftp.nigrofranciscatto.com.br"
FTP_USER="dev@nigrofranciscatto.com.br"
REMOTE_DIR="/public_html"
LOCAL_DIR="dist"

# O servidor (br65-cp.valueserver.com.br / Pure-FTPd) responde
# "500 This security scheme is not implemented" a AUTH TLS e AUTH SSL,
# e não expõe as portas 990 (FTPS implícito) nem 22 (SFTP).
# Por isso a conexão vai sem criptografia — a senha trafega em texto puro.
#
# Quando a hospedagem habilitar FTPS ou SFTP, troque para "yes" aqui.
FTP_TLS="no"

# Arquivos da raiz do site. A pasta assets/ é tratada à parte (espelhada).
ROOT_FILES=(
  index.html
  404.html
  .htaccess
  favicon.ico
  icone.png
  robots.txt
  placeholder.svg
  codigo-etica.pdf
)

cd "$(dirname "$0")"

if ! command -v lftp >/dev/null 2>&1; then
  echo "ERRO: lftp não está instalado."
  echo "Instale com:  brew install lftp"
  exit 1
fi

if [[ "${1:-}" != "--skip-build" ]]; then
  echo "==> Gerando build..."
  npm run build
fi

if [[ ! -f "$LOCAL_DIR/index.html" ]]; then
  echo "ERRO: $LOCAL_DIR/index.html não encontrado. Rode 'npm run build' antes."
  exit 1
fi

# Confere se todos os arquivos da raiz existem antes de começar o envio
for f in "${ROOT_FILES[@]}"; do
  if [[ ! -f "$LOCAL_DIR/$f" ]]; then
    echo "ERRO: $LOCAL_DIR/$f não existe. Abortando para não subir o site incompleto."
    exit 1
  fi
done

if [[ "$FTP_TLS" == "yes" ]]; then
  TLS_SETTINGS="set ftp:ssl-force true; set ftp:ssl-protect-data true; set ssl:verify-certificate no"
else
  TLS_SETTINGS="set ftp:ssl-allow no"
fi

echo
echo "Servidor: $FTP_HOST"
echo "Usuário:  $FTP_USER"
echo "Destino:  $REMOTE_DIR"
if [[ "$FTP_TLS" != "yes" ]]; then
  echo
  echo "AVISO: este servidor não aceita FTPS; a conexão vai SEM criptografia."
  echo "       Peça FTPS/SFTP à hospedagem e troque FTP_TLS para \"yes\"."
fi
echo
read -rsp "Senha FTP: " FTP_PASS
echo
echo
echo "==> Enviando arquivos..."

# A pasta assets/ é espelhada com --delete porque os nomes dos arquivos
# mudam a cada build; os antigos precisam sair. O --delete é aplicado
# SOMENTE dentro de assets/, nunca na raiz (que tem cgi-bin e outros).
lftp <<LFTP_SCRIPT
$TLS_SETTINGS
set cmd:fail-exit true
open -u "$FTP_USER","$FTP_PASS" "$FTP_HOST"
lcd $LOCAL_DIR
mirror -R --delete --verbose assets/ $REMOTE_DIR/assets/
mput -O $REMOTE_DIR ${ROOT_FILES[@]}
bye
LFTP_SCRIPT

echo
echo "==> Deploy concluído."
echo
echo "Confira (use aba anônima ou Cmd+Shift+R):"
echo "  https://nigrofranciscatto.com.br/"
echo "  https://nigrofranciscatto.com.br/artigos   (dê F5, não pode dar 404)"
echo "  https://nigrofranciscatto.com.br/codigo-etica.pdf"
