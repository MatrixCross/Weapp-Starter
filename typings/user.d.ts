// 业务类型示例
declare namespace User {
  interface UserInfo {
    name: string;
    age: number;
  }
  interface UserList {
    [index: number]: UserInfo
  }
}
