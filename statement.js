import createStatementData from './createStatementData.js'
import invoices from './invoices.json'
import plays from './plays.json'

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}

function renderPlainText(data, plays) {
  let result = `청구 내역 (고객명: ${data.customer})\n`
  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`
  }

  result += `총액: ${usd(data.totalAmount)}\n`
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`
  return result
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays))
}

function renderHtml(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>
  <table>
    <tr>
      <th>연극</th>
      <th>좌석 수</th>
      <th>금액</th>
    </tr>
  </table>
  `

  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td>(${perf.audience}석)`
    result += `<td>${usd(perf.amount)}</td></tr>`
  }

  result += `</table>`
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>`
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>`

  return result
}

function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber / 100)
}

console.log(statement(invoices[0], plays))
