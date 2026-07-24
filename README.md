# Simulation Flow 交接文档

## 项目概述

`simulation-flow` 是一个 2D 虚拟仿真电路模拟 Demo，当前用于预研“设备供电 + 传感器数据上报 + 网关接收”的可视化仿真流程。

项目基于 React、TypeScript、Vite 和 React Flow 构建。画布中通过节点和连线表达虚拟设备之间的关系：电源为设备供电，传感器在运行后按配置周期产生数据，网关通过数据输入端口接收传感器数据。

当前版本重点是验证交互和仿真链路可行性，还不是完整的电路物理仿真引擎。

## 技术栈

- React 19
- TypeScript
- Vite
- @xyflow/react：2D 节点画布、拖拽、缩放、连线
- Zustand：全局 UI 状态，如选中节点、添加节点状态
- Mantine Form：配置表单
- Tailwind CSS / shadcn 风格组件
- Sonner：运行结果和模拟数据提示

## 本地运行

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

构建：

```bash
npm run build
```

代码检查：

```bash
npm run lint
```

## 当前核心功能

### 画布能力

- 支持节点拖拽、缩放、连线和删除。
- 支持从底部工具栏添加节点。
- 支持点击节点后在右侧 Drawer 中修改节点配置。
- 支持运行和停止仿真。

### 当前节点类型

- `PowerNode`：电源节点，提供 `voltage` 和 `ampere`。
- `LightNode`：灯节点，需要匹配电源正负极后显示有效连接状态。
- `SensorNode`：传感器节点，需要供电，并在仿真运行后按周期生成 payload。
- `GatewayNode`：网关节点，作为中心接收端，包含多个 data input。
- `NoteNode`：说明节点，当前用于在画布中展示 Demo 说明。

### 当前仿真流程

1. 用户在画布中连接节点。
2. `PowerNode` 的 `positive` 和 `negative` 端口连接到需要供电的设备。
3. `SensorNode` 的数据端口连接到 `GatewayNode` 的 data input。
4. 点击 `Run` 后，系统会先检查：
   - 需要供电的节点是否正确连接正负极。
   - 电源和设备的电压、电流配置是否匹配。
   - 是否存在错误连线。
5. 校验通过后，传感器会按照 `intervalMs` 定时生成模拟数据。
6. 网关根据 data input 聚合传感器数据，并通过 toast 展示模拟发送结果。
7. 点击 `Stop` 会停止当前所有定时任务并清理提示。

## 重要目录说明

```txt
src/
  app/
    index.tsx                  # React Flow 主画布，维护当前 nodes / edges

  nodes/
    index.ts                   # 节点类型注册
    BaseNode.tsx               # 节点通用外壳和选中态
    common/NoteNode.tsx        # 画布说明节点
    power/PowerNode.tsx        # 电源节点
    device/LightNode.tsx       # 灯节点
    device/SensorNode.tsx      # 传感器节点
    gateway/GatewayNode.tsx    # 网关节点

  components/
    config/                    # 右侧节点配置面板
    toolbar/                   # 底部工具栏
    ui/                        # 通用 UI 组件

  lib/
    simulation.ts              # 当前仿真运行逻辑
    validateNodePower.ts       # 节点供电校验

  hooks/
    usePowerSourceValidation.tsx # 节点内部展示用供电校验 Hook

  edges/
    ErrorEdge.tsx              # 错误连线样式

  store/
    index.tsx                  # Zustand UI 状态
```

## 配置面板说明

配置入口在 `src/components/config/index.tsx`。

当前根据节点类型分发到不同配置组件：

- `PowerNodeConfig`
- `LightNodeConfig`
- `SensorNodeConfig`
- `GatewayNodeConfig`

公共供电字段已经抽到 `PowerFields.tsx`，用于复用 `voltage` 和 `ampere` 的表单。

当前配置组件直接调用 React Flow 的 `updateNodeData` 更新节点数据。这个方式适合当前 Demo 阶段，后续如果节点类型和字段大量增加，可以考虑把配置 schema、默认值和校验逻辑下沉到各节点 domain 层。

## 当前设计约定

- 预研阶段暂时只支持一个中心 `GatewayNode`。
- `GatewayNode` 可以包含多个 data input。
- `SensorNode` 作为一个设备数据源，通过单个数据端口输出数据。
- 一个 Sensor 当前配置一个字段名和一个 payload。
- 电源连接和数据连接当前都使用 React Flow edge 表达，但校验规则不同。
- `Run` 触发仿真，`Stop` 停止仿真定时任务。

## 已知限制

- 当前不是完整电路求解器，不支持真实电路中的串并联、电阻、电流分配、短路分析等物理计算。
- 电压和电流目前是字符串，例如 `12V`、`3A`，适合展示和简单匹配，不适合长期作为仿真计算数据。
- `simulation.ts` 当前仍偏 Demo 实现，直接使用 `setInterval` 和 toast 展示模拟发送结果。
- `nodes` 和 `edges` 当前维护在 `app/index.tsx` 的本地 state 中，后续如需运行历史、保存加载、撤销重做，建议收敛到更明确的状态管理或仿真 runtime。
- 供电校验目前检查同一电源是否同时连接目标节点的正负极，并比较电压、电流是否匹配，没有做完整回路分析。
- 当前初始数据中仍有 Demo 性质的节点和连线配置，交付生产前需要清理或改为模板化初始化。

## 后续建议

### 1. 抽离仿真引擎

建议新增独立目录：

```txt
src/simulation/
  types.ts
  buildGraph.ts
  validateConnections.ts
  runSimulation.ts
  runtime.ts
```

目标是让 React 组件只负责展示和交互，仿真逻辑由纯函数或 runtime 模块处理。

### 2. 区分电源边和数据边

当前连接规则已经开始区分 Power 到设备、Sensor 到 Gateway，但还没有形成明确的数据结构。后续可以在 edge data 中加入：

```ts
type EdgeDomain = 'power' | 'data';
```

这样可以避免继续依赖 `sourceHandle` / `targetHandle` 字符串做全部判断。

### 3. 结构化节点数据

后续建议将节点数据从平铺字段改为更明确的结构：

```ts
type SensorNodeData = {
  name?: string;
  power: {
    voltage: number;
    ampere: number;
  };
  source: {
    mode: 'fixed' | 'random';
    intervalMs: number;
    fields: SensorField[];
  };
};
```

这样更利于后续扩展多字段传感器、协议模拟、运行日志和真实计算。

### 4. 建立统一运行结果

后续可以让 `Run` 输出统一结果：

```ts
type SimulationResult = {
  ok: boolean;
  errors: SimulationError[];
  nodeStates: Record<string, unknown>;
  events: SimulationEvent[];
};
```

节点组件根据结果展示状态，不在组件内部执行核心仿真逻辑。

### 5. 完善 Gateway 能力

后续可继续扩展：

- 多 data input 配置。
- 协议模拟，如 HTTP、WebSocket、MQTT。
- 消息缓存和转发策略。
- 收包历史。
- 运行日志和调试面板。

## 交接注意事项

- 当前项目是 Demo / 预研性质，代码优先验证流程闭环。
- 后续开发应避免把业务仿真逻辑继续写进节点组件。
- 节点组件建议只做展示，配置组件只做参数编辑，仿真计算应逐步迁移到独立 simulation 层。
- 如果继续推进为正式项目，第一优先级是明确仿真模型，而不是继续增加更多 UI 节点。
