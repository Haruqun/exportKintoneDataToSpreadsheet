function exportKintoneDataToSpreadsheet() {
    var kintoneDomain = 'YOUR_KINTONE_DOMAIN'; // Kintoneのドメイン（例: 'example.kintone.com'）
    var kintoneAppId = 'YOUR_KINTONE_APP_ID'; // KintoneのアプリID
    var kintoneApiToken = 'YOUR_KINTONE_API_TOKEN'; // KintoneのAPIトークン

    var sheetId = 'YOUR_GOOGLE_SPREADSHEET_ID'; // Google SpreadsheetのID（例: 'abcdef123456'）

    // Kintone APIからデータを取得
    var kintoneUrl = 'https://' + kintoneDomain + '/k/v1/records.json?app=' + kintoneAppId;
    var headers = {
    'X-Cybozu-API-Token': kintoneApiToken
    };
    var kintoneResponse = UrlFetchApp.fetch(kintoneUrl, {
    method: 'GET',
    headers: headers,
    muteHttpExceptions: true
    });
    var kintoneData = JSON.parse(kintoneResponse.getContentText()).records;

    // Google Sheets APIを使用してデータを書き込む
    var spreadsheet = SpreadsheetApp.openById(sheetId);
    var sheet = spreadsheet.getActiveSheet();

    // ヘッダ行を書き込む
    var headers = Object.keys(kintoneData[0]);
    sheet.appendRow(headers);

    // データを書き込む
    for (var i = 0; i < kintoneData.length; i++) {
    var rowData = Object.values(kintoneData[i]);
    sheet.appendRow(rowData);
    }
}
