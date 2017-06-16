import React from 'react';
import {
  Grid,
  Well,
  Row,
  Col,
  Glyphicon,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  tooltip(){
    return(<Tooltip id="tooltip">気になったら問い合わせからご連絡ください！お願いします！なんでもしますから！</Tooltip>)
  }

  render () {
    return (
      <div className="about">
        <Well className="about-header">
          <Grid>
            <div className='about-header-name'>
              <strong>まとめ<img src='http://img.m-ch.xyz/statics/icon.png' width='64px'/>ちゃんねる</strong>とは…
            </div>
            <p className='about-header-description'>
              匿名掲示板です。
            </p>
            <p className='about-header-description'>
              ただの掲示板におまけ機能として以下のような機能があります。
            </p>
          </Grid>
        </Well>
        <Grid className='about-feature'>
          <Row>
            <Col xs={6}>
              <Glyphicon glyph='comment' className='about-feature-icon'/>
              <p>
                リアルタイムなコメント表示
              </p>
            </Col>
            <Col xs={6}>
              <Glyphicon glyph='globe' className='about-feature-icon'/>
              <p>WEBサイトのURLから魚拓(画像)を作る</p>
              <p>WEBサイトをまとめる</p>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={6}>
              <Glyphicon glyph='picture' className='about-feature-icon'/>
              <p>画像のURLから魚拓を作る</p>
              <p>画像をまとめる</p>
            </Col>
            <Col xs={6}>
              <Glyphicon glyph='paperclip' className='about-feature-icon'/>
              <p>好きなスレッドをお気に入り登録できる</p>
              <p>好きなコメントをお気に入り登録できる</p>
            </Col>
          </Row>
          <hr />
        </Grid>
        <Grid className='about-appeal'>
          <h3>製作者のアピールタイム(許してください！)</h3>
          <hr/>
          <p>
            偉そうにまとめてみましたが、まとめちゃんねるは勉強用＆
            <OverlayTrigger placement="top" overlay={ this.tooltip() }>
              <strong className='want-job'>求職</strong>
            </OverlayTrigger>
            のアピール用に作ったWEBサービスです。
          </p>
          <p>
            自分おっさんなので、２ちゃんねるとかよく見るんですが、よく画像のURLとかWEBのURLをクリックして<strike>ブラクラにひっかｋ</strike>、404エラーとかよくあるんですよね。一体どんな画像だったのか、どんなページだったのか、気になって眠れなくなりませんか？他にもどっかでみたあの画像やWEBサイトどこだっけ・・・あー探すのめんどいわーってときありませんか？そんな問題を解決するべく作ってみたサービスです。<strike>でも、根本的にこのサービス誰も使ってないからそもそもそんな問題起こり得ないよね。</strike>
          </p>
          <br/>
          <h4>サーバ関連</h4>
          使っているもの一覧。個人の趣味レベルで作ったものなので最弱のプランで動いてます。<strike>なので、もしアクセスが増えたらすぐに鯖が落ちると思う。</strike>
          <ul>
            <li>AWS EC2(Webサーバ兼ジョブ実行サーバ)</li>
            <li>AWS RDS(DBサーバ、mysqlを使用)</li>
            <li>AWS ElasticCache(Redisを使用、ジョブ処理(sidekiq)とactioncableのstore用))</li>
            <li>AWS Elasticsearch(全文検索用)</li>
            <li>AWS API Gateway(LambdaでWebshotを作成するための入り口)</li>
            <li>AWS Lambda(Webshotの作成)</li>
            <li>AWS S3(画像置き場)</li>
          </ul>
          <br/>
          <h4>ソースコード</h4>
          <ul>
            <li><a href='https://github.com/tanik/matome_channel_server'>サーバサイド(Ruby on Rails 5.1.0)</a></li>
            <li><a href='https://github.com/tanik/matome_channel_client'>フロントエンド(webpack(react, react-redux etc.)</a></li>
            <li><a href='https://github.com/tanik/webshot_on_lambda'>Webshot on lambda(WEBサイトの魚拓作成用)</a></li>
            <li><a href='https://github.com/tanik/getimage_on_lambda'>Getimage on lambda(画像の魚拓作成)</a></li>
          </ul>
        </Grid>
      </div>
    )
  }
}
