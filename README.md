# elegaku-statistics
* エレガンス学院の出勤情報等を集計し、種別ごとに確認できるサービス

## TODO
* 技術選定
* DB設計

## AWS
* AWS CLIを使う
* DynamoDB
* Lambda
* フロントはReactで行く（S3に配置）

## 実装したいこと
1. 統計情報（１月の出勤状況とか）の表示
   * 人ごとの出勤状況（上旬は出勤率が高くて、下旬は低いとか）
   * 全体の出勤状況
   * 年代別の出勤状況
2. ログイン機能（Twitterとかの連携で良い）※優先度かなり低い

## 画面構成
* INDEX（タブ切替）
  * エレガク全体の統計情報（検索条件変更可能）
  * 女の子一覧（個別の統計情報へ遷移するため）
* 個別情報

## デザイン
* デザインはスマホのみで良い
  * ゆくゆくはPC版も対応
* グラフ表示＋数値での表示
  * グラフ表示は円グラフ？棒グラフ？等の検討が必要