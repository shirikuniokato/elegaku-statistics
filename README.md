# elegaku-statistics

- エレガンス学院の出勤情報等を集計し、種別ごとに確認できるサービス

## TODO

- 技術選定
- DB 設計

## AWS

- AWS CLI を使う
- DynamoDB
- Lambda
- フロントは React で行く（S3 に配置）

### API Gateway

- プロキシ統合
- ルート
  - attendance-information ※scan
    - {id} ※scan
      - {ym} ※scan
    - ym
      - {ym} ※scan
  - attendance-information-month ※scan
    - {ym} ※scan
      - {id} ※query
  - girl ※scan
    - {id} ※query

### Lambda

- batch
  - update-girl
  - update-attendance-information
  - update-attendance-information-month
- web-api
  - get-girl
  - get-attendance-information
  - get-attendance-information-month

### DynamoDB

- girl

  - id(pk)
  - name
  - age
  - three_size
  - catch_copy
  - image

- attendance-information

  - id(pk)
  - date(sk)
  - name
  - start
  - end

- attendance-information-month
  - id(pk)
  - ym(sk)
  - name
  - attendanceDays
  - attendanceTime

## 最低限、実装したいこと

1. 統計情報（１月の出勤状況とか）の表示
   - 人ごとの出勤状況（上旬は出勤率が高くて、下旬は低いとか）
   - 全体の出勤状況
2. 異常系や０件時の処理

## 表示内容

### 画面一覧

- ホーム

  - 非公式サイトについて
  - 当サイトの使い方
  - 公式 HP、Twitter へのリンク
  - 掲示板のリンク（直近３バージョン）
  - 非公式 Twitter へのリンク
  - お知らせ情報（バグの修正やリリース情報等を通知する）

- 通知
  - Twitter 認証
    - 完了（異常系はまだちょっと弱い）
  - 通知対象の女の子を選択
    - 画面デザインは作成完了
    - API 未作成
    - 通知一覧の検索・ソート条件あってもよさそう
    - チェック処理
  - 上限は３人
- 統計
  - 店全体の統計情報を表示
  - 女の子別の統計情報を表示
- 口コミ
  - 女の子別の口コミ一覧・詳細を表示
  - 口コミの登録画面（Twitter 認証行うか悩み中）
- その他
  - 修正について

### 全体

- [グラフ一覧](https://jp.infragistics.com/products/ignite-ui-react/react/components/charts/chart-overview)
- [オプション一覧](https://www.chartjs.org/docs/latest/api/interfaces/ActiveDataPoint.html)

- 円グラフ（総出勤時間を人ごとで表示する）

- 折れ線グラフ＋縦棒グラフ

  - 日毎の勤務時間合計
  - 日毎の勤務日数合計

- 円グラフ

  - 月の女の子出勤時間の割合（月の女の子の出勤時間合計/月の出勤時間合計）
  - 月の女の子出勤日数の割合（月の女の子の出勤日数合計/月の出勤日数合計）

- １番出勤日数が多い人を出す（１～３位くらい出しても良いかも）
- １番出勤時間が多い人を出す（１～３位くらい出しても良いかも）
- 前月からの変化を出力（優先度低い）

### 女の子別

- 折れ線グラフ
  - 日毎の勤務日数合計
- 棒グラフ

  - 直近３か月の出勤状況

- 前月比較（出勤日数、出勤時間）

## 画面構成

- INDEX（タブ切替）
  - エレガク全体の統計情報（検索条件変更可能）
  - 女の子一覧（個別の統計情報へ遷移するため）
- 個別情報

## デザイン

- デザインはスマホのみで良い
  - ゆくゆくは PC 版も対応

## コスト削減

- Lambda 見直し
  - 全体取得時に現状４回 API を叩いているが、１回のリクエストで全ての情報を取得するよう修正する：完了
    - 女の子別画面も同様
- DynamoDB 見直し
  - テーブル定義を見直す(特に scan しているテーブル)
    - attendance-information
      - テーブル名を「ym」にして scan 時の総数を減らした方が良さそう
    - attendance-information-month
      - テーブル名を「ym」
    - attendance-information-month-total
      - 現状、特になし
    - girl
      - 現状、特になし

## セキュリティ

- origin の設定見直し（デプロイ先の IP？とかだけを許可するように修正する）
  - 現状は「\*」を設定している

## 今後追加したい機能

- 出勤通知
  - Twitter での通知（DM）
    - Twitter の認証（TwitterAPI ＋ Firebase）
    - Lambda
      - 集計(3 分間隔)
        - 直近１週間分を繰り返し取得
          - 以前の情報を日でまとめて取得
          - id+date+time に変更がある場合は isNotice を 0 に更新
      - 通知(集計完了後)
        - isNotice が 1 のレコードを取得し、Twitter で通知
        - 通知対象となったレコードの isNotice を 1 に更新
      - 削除バッチ
        - 日付は JST
        - 毎日 0:00 に実行
        - システム日付の前日の schedule-notification を削除
    - DynamoDB
      - notification
        - date(pk)
        - id(sk)
        - name
        - time
        - isNotice
      - notification-target-user
        - id(pk)
        - users[]
- 機能別に画面を用意する（Footer から遷移）
- 嬢の口コミ機能

  - 食べログみたいな ★ 何個かみたいな評価
  - フリーフォーム（文字数制限必要）
  - DynamoDB
    - review
      - timestamp(pk) ※ミリ秒を N で保持
      - id
      - userName
      - face
      - body
      - charm
      - service
      - erotic
      - technique
      - score
      - title
      - contents

- 感想・機能改善依頼の投稿フォーム
  - 名前＋送信内容（文字数制限必要）
  - DynamoDB に Put していくか
    - id
    - 名前
    - 内容
- 出勤予報（過去の出勤状況から解析し、予測する）

## TODO

- 統計

  - データが存在しない場合の考慮漏れ
  - グラフの高さ固定したい
  - 生徒別の出力内容精査

- 口コミ

  - 登録画面の裏側
  - 一覧表示（女の子での絞り込み機能あり）
    - cityheaven と UI の参考ページ見て決める
    - 女の子を絞り込んだ場合は、平均値をグラフで表示する（数値項目）
  - 最近の口コミ
    - カルーセル使う

- 出勤通知

  - データ収集
  - TwitterAPI を使った DM 送信

- その他
  - 問い合わせフォーム作成
  - 機能改善依頼受付

## Twitter API

- https://elegaku-unofficial.firebaseapp.com/__/auth/handler

## デプロイについて

- Vercle を使用
- domain は Conoha にて取得済み（elegaku-unofficial）
