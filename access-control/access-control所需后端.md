# SecureDataFlow 访问控制页面需要调用的后端API

本文档详细列出了项目中需要与后端交互的所有API接口信息，包括接口端点、用途及代码位置等。

## 1. 用户管理 API

### 基本信息
- **API 端点**: `/api/users`
- **用途**: 获取用户列表、添加用户、编辑用户、删除用户

### 代码位置
```javascript
// 加载用户数据
function loadUsers(page = 1, pageSize = 10) {
  // 实际项目中应该调用API获取用户数据
  // fetch(`${API_ENDPOINTS.USERS}?page=${page}&pageSize=${pageSize}`)
  //   .then(response => response.json())
  //   .then(data => renderUsers(data))
  //   .catch(error => console.error('Error loading users:', error));
}

// 渲染用户数据
function renderUsers(users) {
  // 实际项目中应根据API返回的数据渲染用户列表
}

// 添加用户按钮事件
document.getElementById('addUserBtn').addEventListener('click', function() {
  // 显示添加用户模态框
});

// 编辑用户按钮事件
document.addEventListener('click', function(e) {
  if (e.target.closest('.edit-user-btn')) {
    const userId = e.target.closest('.edit-user-btn').getAttribute('data-user-id');
    // 实际项目中应该调用API获取用户数据
    // fetch(`${API_ENDPOINTS.USERS}/${userId}`)
    //   .then(response => response.json())
    //   .then(user => {
    //     // 填充用户表单
    //   })
    //   .catch(error => console.error('Error loading user:', error));
  }
});

// 删除用户按钮事件
document.addEventListener('click', function(e) {
  if (e.target.closest('.delete-user-btn')) {
    const userId = e.target.closest('.delete-user-btn').getAttribute('data-user-id');
    if (confirm('确定要删除这个用户吗？此操作无法撤销。')) {
      // 实际项目中应该调用API删除用户
      // fetch(`${API_ENDPOINTS.USERS}/${userId}`, {
      //   method: 'DELETE'
      // })
      // .then(response => {
      //   if (response.ok) {
      //     loadUsers(); // 重新加载用户列表
      //   }
      // })
      // .catch(error => console.error('Error deleting user:', error));
    }
  }
});

// 保存用户表单
userForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const userId = document.getElementById('userId').value;
  const formData = {
    name: document.getElementById('userName').value,
    email: document.getElementById('userEmail').value,
    departmentId: document.getElementById('userDepartment').value,
    roleId: document.getElementById('userRole').value
  };

  if (userId) {
    // 更新用户
    // fetch(`${API_ENDPOINTS.USERS}/${userId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(formData)
    // })
    // .then(response => {
    //   if (response.ok) {
    //     hideModal(userModal);
    //     loadUsers(); // 重新加载用户列表
    //   }
    // })
    // .catch(error => console.error('Error updating user:', error));
  } else {
    // 创建用户
    // fetch(API_ENDPOINTS.USERS, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(formData)
    // })
    // .then(response => {
    //   if (response.ok) {
    //     hideModal(userModal);
    //     loadUsers(); // 重新加载用户列表
    //   }
    // })
    // .catch(error => console.error('Error creating user:', error));
  }
});
```

## 2. 角色管理 API

### 基本信息
- **API 端点**: `/api/roles`
- **用途**: 获取角色列表、创建角色、编辑角色、删除角色

### 代码位置
```javascript
// 加载角色数据
function loadRoles() {
  // 实际项目中应该调用API获取角色数据
  // fetch(API_ENDPOINTS.ROLES)
  //   .then(response => response.json())
  //   .then(data => renderRoles(data))
  //   .catch(error => console.error('Error loading roles:', error));
}

// 渲染角色数据
function renderRoles(roles) {
  // 实际项目中应根据API返回的数据渲染角色列表
}

// 新建角色按钮事件
document.getElementById('addRoleBtn').addEventListener('click', function() {
  // 显示新建角色模态框
});

// 保存角色表单
roleForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = {
    name: document.getElementById('roleName').value,
    description: document.getElementById('roleDescription').value,
    permissions: $('#rolePermissionTree').jstree('get_selected')
  };

  // 创建角色
  // fetch(API_ENDPOINTS.ROLES, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(formData)
  // })
  // .then(response => {
  //   if (response.ok) {
  //     hideModal(roleModal);
  //     loadRoles(); // 重新加载角色列表
  //   }
  // })
  // .catch(error => console.error('Error creating role:', error));
});
```

## 3. 权限管理 API

### 基本信息
- **API 端点**: `/api/permissions`
- **用途**: 获取权限树数据、保存权限树配置

### 代码位置
```javascript
// 初始化权限树
$('#permission-tree').jstree({
  'core': {
    'data': {
      'url': API_ENDPOINTS.PERMISSIONS,
      'dataType': 'json'
    },
    "themes": {
      "responsive": false,
      "dots": true
    }
  },
  "plugins": ["wholerow", "checkbox", "types"],
  "types": {
    "department": { "icon": "fa fa-users" },
    "database": { "icon": "fa fa-database" },
    "permission": { "icon": "fa fa-key" }
  }
});

// 保存权限树配置
document.getElementById('saveTreeBtn').addEventListener('click', function() {
  const selectedNodes = $('#permission-tree').jstree('get_selected');
  const data = {
    permissions: selectedNodes
  };

  // 保存权限配置
  // fetch(API_ENDPOINTS.PERMISSIONS, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data)
  // })
  // .then(response => {
  //   if (response.ok) {
  //     alert('权限配置已保存');
  //   }
  // })
  // .catch(error => console.error('Error saving permissions:', error));
});
```

## 4. 部门管理 API

### 基本信息
- **API 端点**: `/api/departments`
- **用途**: 获取部门列表

### 代码位置
```javascript
// 加载部门选项
function loadDepartments() {
  // 实际项目中应该调用API获取部门数据
  // fetch(API_ENDPOINTS.DEPARTMENTS)
  //   .then(response => response.json())
  //   .then(data => {
  //     const select = document.getElementById('userDepartment');
  //     data.forEach(dept => {
  //       const option = document.createElement('option');
  //       option.value = dept.id;
  //       option.textContent = dept.name;
  //       select.appendChild(option);
  //     });
  //   })
  //   .catch(error => console.error('Error loading departments:', error));
}
```

## 5. 权限矩阵 API

### 基本信息
- **API 端点**: `/api/permission-matrix`
- **用途**: 获取权限矩阵数据

### 代码位置
```javascript
// 加载权限矩阵数据
function loadPermissionMatrix() {
  // 实际项目中应该调用API获取权限矩阵数据
  // fetch(API_ENDPOINTS.PERMISSION_MATRIX)
  //   .then(response => response.json())
  //   .then(data => renderPermissionMatrix(data))
  //   .catch(error => console.error('Error loading permission matrix:', error));
}

// 渲染权限矩阵数据
function renderPermissionMatrix(matrix) {
  // 实际项目中应根据API返回的数据渲染权限矩阵
}