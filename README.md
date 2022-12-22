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
      - {date} ※query
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

## 実装したいこと

1. 統計情報（１月の出勤状況とか）の表示
   - 人ごとの出勤状況（上旬は出勤率が高くて、下旬は低いとか）
   - 全体の出勤状況
2. ログイン機能（Twitter とかの連携で良い）※優先度かなり低い

## 表示内容

### ALL

- [グラフ一覧](https://jp.infragistics.com/products/ignite-ui-react/react/components/charts/chart-overview)
- [オプション一覧](https://www.chartjs.org/docs/latest/api/interfaces/ActiveDataPoint.html)

  - 円グラフ（総出勤時間を人ごとで表示する）
  - 棒グラフ（総出勤時間を人ごとで表示する）
  - 折れ線グラフ（縦軸：時間、横軸：日で人ごとの線を引く）

- １番出勤日数が多い人を出す（１～３位くらい出しても良いかも）
- １番出勤時間が多い人を出す（１～３位くらい出しても良いかも）
- 前月からの変化を出力（優先度低い）

### 個別

## 画面構成

- INDEX（タブ切替）
  - エレガク全体の統計情報（検索条件変更可能）
  - 女の子一覧（個別の統計情報へ遷移するため）
- 個別情報

## デザイン

- デザインはスマホのみで良い
  - ゆくゆくは PC 版も対応
- グラフ表示＋数値での表示
  - グラフ表示は円グラフ？棒グラフ？等の検討が必要
