# Asai Neko

## 个人信息

- 姓名：Asai Neko
- 出生年份：2006
- 地点：中国，上海
- 个人主页：[sne.moe](https://sne.moe)
- Forge：[forge.asnk.io/sugar](https://forge.asnk.io/sugar)
- GitHub：[github.com/SugarNekoE](https://github.com/SugarNekoE)

偏系统方向的软件与基础设施工程师，主要关注 Linux、计算机网络、云原生基础设施、后端工程及 AI 应用。工作覆盖 Linux 内核开发、云平台，以及面向生产团队的私有 LLM 推理平台。

喜欢设计可靠的系统、建设生产级基础设施，并持续探索前沿技术与工程实践。

Linux 内核贡献者，NixCN Nix/NixOS 中文社区成员，并参与主办 NixCN Conf 开源会议。

---

## 项目经历

### DeepInfer SM80
#### SM80 推理适配（开发中）

正在开发：将 DeepInfer 优化推理栈迁移至 NVIDIA SM80 GPU，重点适配最主要的 Decode 路径。

- 针对 SM80 适配 GEMM、专家并行（EP）、MLA、Select 与 JIT 等相关组件。
- 将 DeepInfer 最主要的 Decode 路径迁移至 Ampere，并保持现有优化推理运行时。
- 将 DeepSeek-V4.1-Flash 推理从上游 SM100 与 Ascend 目标平台扩展至 SM80 部署。

### Linux Kernel
#### 硬件与驱动开发

参与 Linux 内核硬件监控、音频与设备驱动等模块的开发与修复。

- 参与 hwmon 驱动及硬件监控接口开发。
- 参与 ALSA 音频驱动开发与修复，包括 USB 音频设备。
- 参与 platform 与硬件相关子系统的设备驱动改动。

仓库：[forge.asnk.io/sugar/linux](https://forge.asnk.io/sugar/linux)

### NixCN & NixCN Conf
#### 开源贡献与开源社区会议组织

- 参与 NixCN 社区基础设施及开源项目的开发与维护。
- 参与 NixCN Conf 的组织工作，会议主要围绕 Nix/NixOS 生态、可复现系统及相关开源技术。
- 开发 NixCN 开源会务管理系统，用于支持会议运营、参会者管理、议程安排及现场工作流。
- 系统主要使用 Go、SvelteKit、PostgreSQL、Redis、OpenTelemetry、OpenAPI、Nix/devenv 等技术。

组织：[forge.asnk.io/nixcn](https://forge.asnk.io/nixcn)

### Flake
#### 声明式 NixOS 与 Home Manager 配置

用于管理 NixOS 系统与 Home Manager 用户环境的个人 Nix flake。

- 设计自定义的面向切面（aspect）布局，使用 Nix 构建嵌入式领域专用语言（DSL），用于声明与组合 NixOS 和 Home Manager 配置，实现模块自动发现与主机配置组装。
- 将应用、服务、桌面环境及硬件设置组织为共享模块与主机专属配置。

仓库：[forge.asnk.io/sugar/flake](https://forge.asnk.io/sugar/flake)

### Asai Blog
#### 静态博客与发布系统

采用函数式编程技术栈构建的静态博客：使用 Haskell（Hakyll 和 Pandoc）生成站点，使用 Elm 构建交互前端，内容通过 Obsidian 编写。

- 将标记为已发布的 Markdown 笔记编译为静态页面，在构建时解析双链与附件引用。
- 通过 Elm 界面实现搜索、分类与标签筛选，以及键盘导航。

仓库：[forge.asnk.io/sugar/asai-blog](https://forge.asnk.io/sugar/asai-blog)

### ACS K8s
#### Serverless CI Runner 系统

基于阿里云 ACS Serverless Kubernetes 构建的 Forgejo Actions Runner 系统，旨在减少 Runner 空闲资源占用，相较于维护专用服务器或全天运行的集群，更好地控制成本。

- 使用 KEDA 根据任务队列按需伸缩临时 Runner，每个 Runner 执行一个任务，空闲时将 Runner 池缩容至零。
- 使用 Go 构建 CLI，统一管理 Runner 配置、部署与诊断。
- 使用 Buildah 构建容器镜像，替代以特权模式运行的 Docker-in-Docker。

仓库：[forge.asnk.io/sugar/acs-k8s](https://forge.asnk.io/sugar/acs-k8s)

### Git 索引系统
#### 超大规模仓库处理

构建高并发 Git 索引系统，针对 Linux 内核等超大规模仓库进行优化。

- 支持同时加载 150 万条提交记录，并发处理 Git 日志查询与对象读取。
- 针对高并发索引负载调优内核参数。
- 优化 NFSv4 协议使用，支持并发仓库访问。
- 优化 Git 核心操作，改善超大规模仓库的日志查询与对象读取。
- 实测 I/O 吞吐达到 3,200 IOPS。

网站：[forge.asnk.io](https://forge.asnk.io)

### Ayame Cluster
#### 生产级 Kubernetes 平台

独立设计、搭建并持续维护一个由 3 个控制节点和 5 个 Worker 节点组成的生产级 Kubernetes 平台，通过代码统一管理基础设施供应、集群配置、应用部署和持续交付。

- 使用 Terraform 设计并供应底层基础设施。
- 基于 Argo CD 建设声明式 GitOps 工作流，实现集群及应用生命周期管理。
- 集成 TeamCity，实现从源代码到生产部署的自动化 CI/CD。
- 将集群配置划分为基础设施层、平台层和应用层进行管理。
- 承载并维护代码托管、容器镜像仓库、通信服务、数据库及 Web 应用等生产工作负载。
- 部署并维护 Istio、cert-manager、Sealed Secrets、CloudNativePG 及 CSI 持久化存储。
- 设计生产网络、TLS/PKI、服务网络、存储、密钥管理及数据库基础设施。
- 通过 IaC 和声明式 Kubernetes 配置维护完整平台。

仓库：[forge.asnk.io/sugar/ayame-cluster](https://forge.asnk.io/sugar/ayame-cluster)

---

## 工作经历

### 全栈工程师与 AI 基础设施工程师
#### 教育行业

2026 – 至今

从事教育领域工作，覆盖全栈产品研发、生产基础设施、应用运维及大语言模型应用研究。

- 负责生产级项目运维管理平台的设计与开发。
- 设计开发基于 Haskell 的 LaTeX 实时智能体输入输出论文生成系统。
- 负责基于 Torch 与 DeepMind 模型的高等数学图形生成模型后端设计与开发。
- 基于 NetBird 搭建企业 Zero Trust 互联网络平台，替换原有付费 Tailscale 方案，实现对网络设备与服务访问权限的细粒度管理。
- 搭建并部署基于多台服务器、共 16 卡 A800-80G 的 DeepSeek-V4.1-Flash 模型平台，优化 SM80 vLLM 兼容运行时，供团队工作流私有使用。
- 建设和维护生产应用所需的网络与应用基础设施，覆盖部署自动化、应用生命周期管理、服务网络及基础设施可靠性建设。
- 探索 AI 在完整产品研发生命周期中的应用，包括产品规划、设计、开发、测试及迭代。
- 研究利用 LLM 与 Agent 工具优化产品、设计与开发团队之间的协作和生产效率。

### 首席技术官（CTO）
#### 医疗教育科技行业

2023 年 4 月 – 2026 年 4 月 · 3 年

负责 AI 赋能医疗教育与训练系统的技术架构和产品研发，覆盖软件、硬件、传感器数据、多模态模型及人机交互。

- 加入时团队约 5 人，深度参与团队建设并伴随团队发展至约 50 人，参与建立团队技术基础、工程规范、架构方向及跨部门协作模式。
- 负责整体系统架构设计，直接参与产品核心技术框架设计，并参与指导产品方向与工程优先级。
- 主导研发高精度医疗操作识别，结合多模态模型与人机交互设计教育流程。
- 设计从传感器数据采集、信号处理、数据分析到交互可视化的端到端数据链路。
- 参与设计将实时传感器及分析数据转化为可执行训练反馈的人机交互系统。
- 研究覆盖完整训练流程的连续动态指标，并设计基于多维指标、时间序列及行为数据的训练效果评价与跟踪方法。
- 使用 AI 与数据驱动方法支持训练分析、评估及指导，并参与制定医疗教育动态指标检测及评价相关的技术及行业标准。

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
- 云原生与基础设施：Kubernetes、Terraform、Argo CD、GitOps、CI/CD、IaC
- 云平台：阿里云、GCP、Hetzner
- 网络：BGP、DNS、AS200720 持有者
- AI 与人机交互：LLM 应用与开发、Agent 工作流、人机交互

---

## 兴趣爱好

- 开源软件与开源社区
- Linux 生态
- 可复现环境
- 计算机网络
- 嵌入式工程
- 猫猫
- 二次元

热爱工作，也喜欢持续探索前沿技术、工具和工程实践。
