# SecureDataFlow 数据分析页面需要调用的后端API

本文档详细列出了项目中需要与后端交互的所有API接口信息，包括接口端点、用途及代码位置等。

## 1. 仪表盘统计数据 API

### 基本信息
- **API 端点**: `/api/dashboard/stats`（需确认）
- **用途**: 获取仪表盘概览统计数据（如模型评估指标等）

### 代码位置
```javascript
// 更新指标卡片
function updateMetrics(metrics = {}) {
  document.getElementById('f1-score').textContent = metrics.f1Score ? metrics.f1Score.toFixed(2) : '--';
  document.getElementById('accuracy').textContent = metrics.accuracy ? metrics.accuracy.toFixed(2) : '--';
  document.getElementById('precision').textContent = metrics.precision ? metrics.precision.toFixed(2) : '--';
  document.getElementById('recall').textContent = metrics.recall ? metrics.recall.toFixed(2) : '--';
}

// 实际项目中应调用API加载真实数据
// const statsData = await fetch('/api/dashboard/stats').then(res => res.json());
// updateMetrics(statsData);
```

## 2. 图表数据 API

### 基本信息
- **API 端点**: `/api/dashboard/charts`（需确认）
- **用途**: 获取所有图表的详细数据（如主图表、饼图、ROC曲线等）

### 代码位置
```javascript
// 更新主图表函数
function updateMainChart(type = 'bar', data = {categories: [], values: []}) {
  // 图表配置逻辑...
}

// 饼图配置
function updatePieChart(data = []) {
  // 图表配置逻辑...
}

// ROC曲线配置
function updateRocChart(data = [], auc = 0) {
  // 图表配置逻辑...
}

// 实际项目中应调用API加载图表数据
// fetch('/api/dashboard/charts')
//   .then(res => res.json())
//   .then(data => {
//     updateMainChart(data.mainChartType, data.mainChartData);
//     updatePieChart(data.pieChartData);
//     updateRocChart(data.rocChartData, data.auc);
//   });
```

## 3. 数据表格数据 API

### 基本信息
- **API 端点**: `/api/dashboard/data-table`（需确认）
- **用途**: 获取数据表格的详细数据

### 代码位置
```javascript
// 加载数据表格
function loadDataTable(data = [], page = 1, pageSize = 10) {
  // 数据表格加载逻辑...
}

// 实际项目中应调用API获取数据
// const tableData = await fetch('/api/dashboard/data-table').then(res => res.json());
// loadDataTable(tableData, 1, 10);
```

## 4. 分析报告数据 API

### 基本信息
- **API 端点**: `/api/dashboard/report`（需确认）
- **用途**: 获取分析报告的详细内容

### 代码位置
```javascript
// 更新分析报告
function updateReport(report = {}) {
  // 报告更新逻辑...
}

// 实际项目中应调用API加载报告数据
// const reportData = await fetch('/api/dashboard/report').then(res => res.json());
// updateReport(reportData);
```

## 5. 用户头像图片 API

### 基本信息
- **API 说明**: 需要将模板中的用户头像路径替换为实际用户头像的API地址
- **用途**: 获取当前登录用户的头像图片

### 代码位置
```html
<!-- 用户信息 -->
<div class="flex items-center">
  <img class="h-8 w-8 rounded-full object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="用户头像">
  <span class="ml-2 text-sm font-medium hidden md:block">数据分析师</span>
</div>
```

### 说明
- 需通过API动态获取当前登录用户的头像地址

## 6. 导出功能相关 API（可选）

### 基本信息
- **API 需求**: 需要实现数据导出接口（如导出CSV、Excel等）
- **用途**: 提供数据导出功能

### 代码位置
```javascript
// 导出CSV
document.getElementById('export-csv').addEventListener('click', function() {
  // 实际项目中应调用API导出CSV
  // exportDataToCSV();
});

// 导出Excel
document.getElementById('export-excel').addEventListener('click', function() {
  // 实际项目中应调用API导出Excel
  // exportDataToExcel();
});