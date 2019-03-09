<template>
  <div>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="标题名称">
        <el-input v-model="searchMap.name" placeholder="活动名称"></el-input>
      </el-form-item>
      <el-form-item label="修改时间日期">
        <el-date-picker type="date" placeholder="选择开始日期" v- model="searchMap.starttime_1"></el-date-picker>
        <el-date-picker type="date" placeholder="选择截止日期" v- model="searchMap.starttime_2"></el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="fetchData()">查询</el-button>
      <el-button type="primary" @click="handleEdit('')">新增</el-button>
    </el-form>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="body" label="主体" width="400"></el-table-column>
      <el-table-column prop="updatetime" label="修改日期" width="180"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row.id)" type="text" size="small">修改</el-button>
          <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="fetchData"
      @current-change="fetchData"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <el-dialog title="代码编辑" :visible.sync="dialogFormVisible">
      <el-form label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="pojo.name" placeholder="标题名称"></el-input>
        </el-form-item>
        <el-form-item label="主体">
          <el-input v-model="pojo.body" placeholder="代码主体"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave()">保存</el-button>
          <el-button @click="dialogFormVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import codeblockApi from "@/api/codeblock";

export default {
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchMap: {}, //查询表单绑定变量
      dialogFormVisible: false, //对话框是否显示
      pojo: {},
      id: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      codeblockApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          this.list = response.data.rows;
          this.total = response.data.total;
        });
    },
    handleSave() {
      gatheringApi.update(this.id, this.pojo).then(response => {
        this.$message({
          message: response.message,
          type: response.flag ? "保存成功" : "error"
        });
        if (response.flag) {
          //如果成功
          this.fetchData(); //刷新列表
        }
      });
      this.dialogFormVisible = false; //关闭窗口
    },
    handleEdit(id) {
      this.id = id;
      this.dialogFormVisible = true; //打开窗口
      if (id != "") {
        //调用查询
        gatheringApi.findById(id).then(response => {
          if (response.flag) {
            this.pojo = response.data;
          }
        });
      } else {
        this.pojo = {}; //清空表单
      }
    },
    handleDelete(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          gatheringApi.deleteById(id).then(response => {
            this.$message({
              message: response.message,
              type: response.flag ? "删除成功" : "error"
            });
            if (response.flag) {
              this.fetchData(); // 刷新数据
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
