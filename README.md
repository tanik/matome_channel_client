# matome_channel_client

[![CircleCI](https://circleci.com/gh/tanik/matome_channel_client.svg?style=svg)](https://circleci.com/gh/tanik/matome_channel_client)

# 概要

まとめちゃんねる(<http://m-ch.xyz>)のフロントエンドの実装 by webpack, react, react-redux


# テスト

~~~
yarn test
~~~

# デプロイ/CI

### デプロイ

~~~
sh build.sh
~~~

### CI

[CircleCI](https://circleci.com)を使用。設定は```circle.yml```。

# 関連リポジトリ

- サーバサイド: [matome_chanel_server](https://github.com/tanik/matome_chanel_server)
- Lambda用website screenshot取得関数: [webshot_on_lambda](https://github.com/tanik/webshot_on_lambda)
- Lambda用image screenshot取得関数: [getimage_on_lambda](https://github.com/tanik/getimage_on_lambda)
- サーバ初期設定用ansible playbook: [matome_channel_setup](https://github.com/tanik/matome_channel_setup)
