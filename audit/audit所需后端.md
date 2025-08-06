# SecureDataFlow 审计与合规页面需要调用的后端API

本文档详细列出了项目中需要与后端交互的所有API接口信息，包括接口端点、用途及代码位置等。

## 1. 操作日志 API

### 基本信息
- **API 端点**: `/api/v1/audit/logs`
- **用途**: 获取操作日志数据

### 代码位置
```javascript
// 加载初始数据
async function loadInitialData() {
  try {
    // 这里应该是调用API获取数据
    // const logsRes = await fetch(API_ENDPOINTS.LOGS);
    // appState.logs = await logsRes.json();
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    renderLogs();
  } catch (error) {
    console.error('加载数据失败:', error);
    showError('加载数据失败，请稍后重试');
  }
}

// 筛选按钮
document.getElementById('filterBtn').addEventListener('click', async function() {
  const dateRange = document.getElementById('dateRange').value;
  const logType = document.getElementById('logType').value;
  const logUser = document.getElementById('logUser').value;
  
  // 显示加载状态
  const logContainer = document.getElementById('logContainer');
  logContainer.innerHTML = `
    <div class="px-6 py-4 text-center text-dark-2">
      <i class="fa fa-spinner fa-spin mr-2"></i>正在筛选数据...
    </div>
  `;
  
  try {
    // 这里应该是调用API筛选数据
    // const params = new URLSearchParams();
    // if (dateRange) params.append('dateRange', dateRange);
    // if (logType) params.append('type', logType);
    // if (logUser) params.append('user', logUser);
    // const response = await fetch(`${API_ENDPOINTS.LOGS}?${params.toString()}`);
    // appState.logs = await response.json();
    await new Promise(resolve => setTimeout(resolve, 800));
    renderLogs();
  } catch (error) {
    console.error('筛选数据失败:', error);
    showError('筛选数据失败');
  }
});
```

## 2. 安全告警 API

### 基本信息
- **API 端点**: `/api/v1/audit/alerts`
- **用途**: 获取安全告警数据

### 代码位置
```javascript
// 加载初始数据
async function loadInitialData() {
  try {
    // 这里应该是调用API获取数据
    // const alertsRes = await fetch(API_ENDPOINTS.ALERTS);
    // appState.alerts = await alertsRes.json();
    await new Promise(resolve => setTimeout(resolve, 800));
    renderAlerts();
  } catch (error) {
    console.error('加载数据失败:', error);
    showError('加载数据失败，请稍后重试');
  }
}

// 查看全部告警
document.getElementById('alertsContainer').addEventListener('click', async function(e) {
  if (e.target.closest('#viewAllAlertsBtn')) {
    const button = e.target.closest('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fa fa-spinner fa-spin mr-1"></i>加载中...';
    button.disabled = true;
    
    try {
      // 这里应该是调用API获取所有告警
      // const response = await fetch(API_ENDPOINTS.ALERTS);
      // appState.alerts = await response.json();
      await new Promise(resolve => setTimeout(resolve, 800));
      renderAlerts();
    } catch (error) {
      console.error('加载告警失败:', error);
      showError('加载告警失败');
    } finally {
      button.innerHTML = originalText;
      button.disabled = false;
    }
  }
});
```

## 3. 区块链存证 API

### 基本信息
- **API 端点**: `/api/v1/audit/blockchain`
- **用途**: 获取区块链存证数据

### 代码位置
```javascript
// 加载初始数据
async function loadInitialData() {
  try {
    // 这里应该是调用API获取数据
    // const blockchainRes = await fetch(API_ENDPOINTS.BLOCKCHAIN);
    // appState.blockchainRecords = await blockchainRes.json();
    await new Promise(resolve => setTimeout(resolve, 800));
    renderBlockchainRecords();
  } catch (error) {
    console.error('加载数据失败:', error);
    showError('加载数据失败，请稍后重试');
  }
}
```

## 4. 统计数据 API

### 基本信息
- **API 端点**: `/api/v1/audit/stats`
- **用途**: 获取统计数据

### 代码位置
```javascript
// 加载初始数据
async function loadInitialData() {
  try {
    // 这里应该是调用API获取数据
    // const statsRes = await fetch(API_ENDPOINTS.STATS);
    // appState.stats = await statsRes.json();
    await new Promise(resolve => setTimeout(resolve, 800));
    renderStats();
  } catch (error) {
    console.error('加载数据失败:', error);
    showError('加载数据失败，请稍后重试');
  }
}
```

## 5. 导出CSV API

### 基本信息
- **API 端点**: `/api/v1/audit/export/csv`
- **用途**: 导出操作日志为CSV文件

### 代码位置
```javascript
// 导出日志为CSV
async function exportLogsToCsv() {
  try {
    // 这里应该是调用API导出CSV
    // const response = await fetch(API_ENDPOINTS.EXPORT_CSV, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     dateRange: document.getElementById('dateRange').value,
    //     type: document.getElementById('logType').value,
    //     user: document.getElementById('logUser').value
    //   })
    // });
    // const blob = await response.blob();
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.setAttribute('href', url);
    // link.setAttribute('download', `操作日志_${new Date().toISOString().slice(0, 10)}.csv`);
    // link.style.visibility = 'hidden';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    await new Promise(resolve => setTimeout(resolve, 800));
    alert('CSV导出功能需要连接后端API实现');
  } catch (error) {
    console.error('导出CSV失败:', error);
    alert('导出CSV失败，请稍后重试');
  }
}
```

## 6. 导出PDF API

### 基本信息
- **API 端点**: `/api/v1/audit/export/pdf`
- **用途**: 导出合规报表为PDF文件

### 代码位置
```javascript
// 导出报表为PDF
async function exportReportToPdf() {
  try {
    // 使用jsPDF库生成PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    // 添加内容...
    doc.save(`合规报表_${new Date().toISOString().slice(0, 10)}.pdf`);
  } catch (error) {
    console.error('导出PDF失败:', error);
    alert('导出PDF失败，请稍后重试');
  }
}
```

## 7. 发送报告 API

### 基本信息
- **API 端点**: `/api/v1/audit/report/send`
- **用途**: 发送合规报表到指定邮箱

### 代码位置
```javascript
// 邮件推送
document.getElementById('emailReportBtn').addEventListener('click', async function() {
  try {
    // 这里应该是调用API发送邮件
    // await fetch(API_ENDPOINTS.SEND_REPORT, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     email: 'audit-admin@securedataflow.com',
    //     dateRange: document.getElementById('dateRange').value
    //   })
    // });
    alert('合规报表已发送到您的邮箱');
  } catch (error) {
    console.error('发送邮件失败:', error);
    alert('发送邮件失败，请稍后重试');
  }
});