rm -rf ./dist && npm run build && rsync -rv --force ./dist/* root@hk:/root/kmall-mobile && echo "发布到m.quanerdai.com成功！！！"
# rm -rf ./dist && npm run build && rsycn -r -v -v  --delete