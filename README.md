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
- Lambda見直し
  - 全体取得時に現状４回APIを叩いているが、１回のリクエストで全ての情報を取得するよう修正する
    - 女の子別画面も同様

## セキュリティ
- originの設定見直し（デプロイ先のIP？とかだけを許可するように修正する）
  - 現状は「*」を設定している

## 今後追加したい機能

- 機能別に画面を用意する（ドロワーメニューから遷移）
- 嬢の口コミ機能
  - 食べログみたいな ★ 何個かみたいな評価
  - フリーフォーム（文字数制限必要）
- 感想・機能改善依頼の投稿フォーム
  - 名前＋送信内容（文字数制限必要）
  - DynamoDB に Put していくか
    - id
    - 名前
    - 内容
- 出勤予報（過去の出勤状況から解析し、予測する）

## デプロイについて
- Vercleを使用
- domainはConohaにて取得済み（elegaku-unofficial）