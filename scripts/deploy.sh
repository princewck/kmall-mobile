rm -rf ./dist && npm run build && scp -r ./dist/* root@kmall_mobile:/var/www/kmall-mobile && echo "发布到m.quanerdai.com成功！！！"
# rm -rf ./dist && npm run build && rsycn -r -v -v  --delete