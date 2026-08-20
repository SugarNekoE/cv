# Asai Neko

## 个人信息

- 姓名：Asai Neko
- 出生年份：2006
- 地点：中国，上海
- 个人主页：[sne.moe](https://sne.moe)
- Forge：[forge.asnk.io/sugar](https://forge.asnk.io/sugar)
- GitHub：[github.com/SugarNekoE](https://github.com/SugarNekoE)

偏系统方向的软件与基础设施工程师，主要关注 Linux、计算机网络、云原生基础设施、后端工程及 AI 应用。

喜欢设计可靠的系统、建设生产级基础设施，并持续探索前沿技术与工程实践。

NixCN Nix/NixOS 中文社区成员，并参与主办 NixCN Conf 开源会议。

---

## 项目经历

### NixCN & NixCN Conf

- 参与 NixCN 社区基础设施及开源项目的开发与维护。
- 参与 NixCN Conf 的组织工作，会议主要围绕 Nix/NixOS 生态、可复现系统及相关开源技术。
- 开发 NixCN 开源会务管理系统，用于支持会议运营、参会者管理、议程安排及现场工作流。
- 系统主要使用 Go、SvelteKit、PostgreSQL、Redis、OpenTelemetry、OpenAPI、Nix/devenv 等技术。

组织：[forge.asnk.io/nixcn](https://forge.asnk.io/nixcn)

### Ayame Cluster — 生产级 Kubernetes 平台

独立设计、搭建并持续维护一个由 3 个控制节点和 5 个 Worker 节点组成的生产级 Kubernetes 平台，通过代码统一管理基础设施供应、集群配置、应用部署和持续交付。

- 使用 Terraform 设计并供应底层基础设施。
- 基于 Argo CD 建设声明式 GitOps 工作流，实现集群及应用生命周期管理。
- 集成 TeamCity，实现从源代码到生产部署的自动化 CI/CD。
- 将集群配置划分为基础设施层、平台层和应用层进行管理。
- 承载并维护代码托管、容器镜像仓库、通信服务、数据库及 Web 应用等生产工作负载。
- 部署并维护 Istio、cert-manager、Sealed Secrets、CloudNativePG 及 CSI 持久化存储。
- 设计生产网络、TLS/PKI、服务网络、存储、密钥管理及数据库基础设施。
- 通过 Infrastructure as Code 和声明式 Kubernetes 配置维护完整平台。

仓库：[forge.asnk.io/sugar/ayame-cluster](https://forge.asnk.io/sugar/ayame-cluster)

### Windi — 邮件与快递管理系统

正在开发中的邮件与快递一体化管理全栈应用。

- 接入大量第三方 API，实现精准的快递及物流信息追踪。
- 提供统一界面管理物流信息、单据及相关记录。
- 支持一站式管理和打印单据、标签及封面。
- 使用 Svelte、SvelteKit 和 TypeScript 实现全栈应用。

仓库：[forge.asnk.io/sugar/windi](https://forge.asnk.io/sugar/windi)

### NyaBot — Go 聊天机器人框架

参与开发基于 Go 的开源聊天机器人框架 NyaBot，贡献 19 个已合并 PR。

- 实现 go-cqhttp 的 HTTP、正向与反向 WebSocket 接入、事件分发及常用操作 API 封装。
- 建设 Go/Lua 扩展机制，并完善配置、数据持久化及多架构容器发布自动化。

仓库：[github.com/SNENET/NyaBot](https://github.com/SNENET/NyaBot)

文档：[github.com/SNENET/NyaBot-Docs](https://github.com/SNENET/NyaBot-Docs)

---

## 工作经历

### 基础设施与 AI 工程师 — 教育行业

2026 – 至今

从事教育领域工作，主要负责生产基础设施、应用运维体系建设，以及大语言模型相关应用研究。

- 参与设计和开发生产级应用运维管理平台。
- 建设和维护生产应用所需的网络与应用基础设施。
- 参与部署自动化、应用生命周期管理、服务网络及基础设施可靠性建设。
- 研究前沿大语言模型在教育领域中的实际应用。
- 探索 AI 在完整产品研发生命周期中的应用，包括产品规划、设计、开发、测试及迭代。
- 研究利用 LLM 与 Agent 工具优化产品、设计与开发团队之间的协作和生产效率。

### 首席技术官（CTO）— 医疗教育科技行业

2023 年 4 月 – 2026 年 4 月 · 3 年

负责 AI 赋能医疗教育与训练系统的技术架构和产品研发，覆盖软件、硬件、传感器数据采集、数据分析及人机交互。

- 加入时团队约 5 人，深度参与团队主要建设工作，并伴随团队发展至约 50 人规模。
- 参与建立团队技术基础、工程规范、架构方向及跨部门协作模式。
- 实践并推进敏捷开发与工程管理，持续优化迭代、协作、交付及研发流程。
- 负责整体系统架构设计，并直接参与产品核心技术框架设计。
- 制定技术方向，并参与指导产品发展方向、架构演进及工程优先级。
- 负责 AI 辅助医疗教育系统中软硬件结合系统的设计和研发。
- 设计从传感器数据采集、信号处理、数据分析到交互可视化的端到端数据链路。
- 参与设计将实时传感器及分析数据转化为训练反馈的人机交互系统。
- 研究覆盖完整医疗教育和训练流程的连续动态指标检测体系。
- 设计基于多维指标、时间序列及行为数据的训练效果评价与跟踪方法。
- 使用 AI 与数据驱动方法支持医疗训练过程中的分析、评估及指导。
- 工作内容横跨产品、软件、硬件、数据、AI 与研究等多个领域。
- 参与制定医疗教育动态指标检测及评价相关的技术及行业标准。
- 在承担技术管理和架构指导职责的同时，持续直接参与核心系统设计与实现。

### IDC 平台工程师

2022

参与生产级 IDC 主要平台的建设、运营与管理。

- 参与核心平台基础设施建设和运营。
- 参与基础设施部署、平台管理、网络、服务运维及维护工作。
- 支持生产基础设施的稳定运行及日常运维。

---

## 技术栈

- 编程语言：Go、C、C++、Rust、TypeScript、Python
- 系统：Linux、Nix / NixOS、RHEL
- 云原生与基础设施：Kubernetes、Terraform、Argo CD、GitOps、CI/CD、Infrastructure as Code
- 网络：BGP、DNS、AS200720 持有者
- AI 与人机交互：LLM 应用与开发、Agent 工作流、人机交互

---

## 兴趣爱好

- 开源软件与开源社区
- Linux 生态
- Nix / NixOS 生态
- 计算机网络
- 嵌入式工程
- 猫猫
- 二次元

热爱工作，也喜欢持续探索前沿技术、工具和工程实践。

~~VRChat 2000+小时 玩家~~
