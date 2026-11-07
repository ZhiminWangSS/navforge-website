window.NAVFORGE = {
  "updated": "2026-10-30",
  "sourceRevision": 821,
  "dimensions": [
    {
      "id": "SG",
      "name": "语义定位",
      "english": "Semantic Grounding",
      "cover": "SG03",
      "scene": "带家具的家居与零售空间",
      "question": "你看到的，是指令说的那一个吗？",
      "description": "从相似外观与不同位置中辨认目标。理解颜色、属性和相对关系，把语言描述对应到场景中的具体物体。"
    },
    {
      "id": "SP",
      "name": "空间认知",
      "english": "Spatial Cognition",
      "cover": "SP03",
      "scene": "多楼层中庭与相似走廊",
      "question": "相似的楼层，不同的目的地。",
      "description": "在结构相似的多层空间中保持位置感，理解楼层、楼梯与店铺的拓扑关系，完成跨层查找与往返。"
    },
    {
      "id": "LH",
      "name": "长时程",
      "english": "Long Horizon",
      "cover": "LH01",
      "scene": "工厂与医院的多站点任务",
      "question": "走得更远，也记得下一步。",
      "description": "把多站点、依赖关系与途中变化串成完整任务。复用工厂巡检与医院补给场景，检查长程记忆和任务持续性。"
    },
    {
      "id": "GE",
      "name": "泛化",
      "english": "Generalization",
      "cover": "GE03",
      "scene": "住宅、街区与不同相机高度",
      "question": "跨越环境，也跨越身体的边界。",
      "description": "从室内走到室外，在不同视角、相机高度与路径约束下执行相同语义目标。现有样例展示环境迁移与机位对照。"
    },
    {
      "id": "MP",
      "name": "运动精度",
      "english": "Motion Precision",
      "cover": "MP01",
      "scene": "轮胎、岩石、倒木与密集障碍",
      "question": "每一次穿行，都有尺度。",
      "description": "在窄口与密集障碍中精确穿行，保持净空，控制转弯并在目标处停稳。从几何场到户外真实资产组合。"
    },
    {
      "id": "SE",
      "name": "速度",
      "english": "Speed & Efficiency",
      "cover": "SE03",
      "scene": "完整操场跑道与时间约束",
      "question": "同一条路，更紧的时间窗口。",
      "description": "在相同路线与安全约束下收紧时间预算，比较速度与路径执行要求。当前操场视频用于任务设计参考。"
    }
  ],
  "cases": [
    {
      "id": "SG01",
      "dimension": "SG",
      "title": "同桌四杯 · 原视角",
      "asset": "HSSD 102815859 · 家居 / 派生杯子布置",
      "description": "四个杯子同时出现，利用颜色与位置关系排除另一个红杯。",
      "instruction": "找到餐桌上位于蓝色杯子和白色杯子之间的红色马克杯，走近它，面向杯子停留1秒。",
      "boundary": "相机参考轨迹回放；派生布置调整了接近侧家具。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcntvJzL90vTDgjc3iTVwJYHf",
      "duration": 9.75,
      "width": 960,
      "height": 540,
      "video": "assets/video/SG01.mp4",
      "poster": "assets/poster/SG01.jpg",
      "images": []
    },
    {
      "id": "SG02",
      "dimension": "SG",
      "title": "同桌四杯 · 100° 视角",
      "asset": "HSSD 102815859 · 家居 / 派生杯子布置",
      "description": "同一语义目标的广角版本，水平 FOV 100°。",
      "instruction": "找到餐桌上位于蓝色杯子和白色杯子之间的红色马克杯，走近它，面向杯子停留1秒。",
      "boundary": "相机参考回放；与 SG01 分别展示不同视角，不能视为独立语义任务。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcn64nv8Z4id7loNpysYGwLnT",
      "duration": 9.5,
      "width": 960,
      "height": 540,
      "video": "assets/video/SG02.mp4",
      "poster": "assets/poster/SG02.jpg",
      "images": []
    },
    {
      "id": "SG03",
      "dimension": "SG",
      "title": "客厅里的米色椅子",
      "asset": "HSSD 102344022 · 家居 + ABO 椅子",
      "description": "三把候选椅子同框，在有家具背景的客厅中进行颜色消歧。",
      "instruction": "找到客厅里三把椅子中米色的那把，走近它并面向椅子停留1秒。",
      "boundary": "固定水平机位，100° 水平 FOV，相机参考轨迹回放。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#C6fldOMbpo2JjuxCzXYc0qDLnrf",
      "duration": 12.5,
      "width": 960,
      "height": 540,
      "video": "assets/video/SG03.mp4",
      "poster": "assets/poster/SG03.jpg",
      "images": []
    },
    {
      "id": "SG04",
      "dimension": "SG",
      "title": "高货架上的红色杯子",
      "asset": "MansionWorld · 一层零售区",
      "description": "绕过矮货架，在不同高货架上的五色杯子中定位红杯。",
      "instruction": "找到摆着红色马克杯的货架，走到货架前，面向红色马克杯停留1秒。",
      "boundary": "参考相机回放；路线和目标可见性已检查，团队人工交叉验收待完成。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#Gde8dEHR2oE5PtxROLSc5ZZbnte",
      "duration": 18.875,
      "width": 960,
      "height": 540,
      "video": "assets/video/SG04.mp4",
      "poster": "assets/poster/SG04.jpg",
      "images": []
    },
    {
      "id": "SG05",
      "dimension": "SG",
      "title": "蓝椅子旁的收银台",
      "asset": "MansionWorld · 一层零售区",
      "description": "蓝色椅子最初不在视野中，需要沿路线发现地标并定位目标。",
      "instruction": "找到三个收银台中靠近蓝色椅子的那个收银台，走到它前面并面向收银台停留1秒。",
      "boundary": "参考相机回放；路线和目标可见性已检查，团队人工交叉验收待完成。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#RvN8dFDZSonzUWxkxh3cgsA0nvg",
      "duration": 27,
      "width": 960,
      "height": 540,
      "video": "assets/video/SG05.mp4",
      "poster": "assets/poster/SG05.jpg",
      "images": []
    },
    {
      "id": "SP01",
      "dimension": "SP",
      "title": "寻找楼上的同位置分店",
      "asset": "WYY 多层组合场景 · HSSD 陈设",
      "description": "在相似楼层中记住面包店的位置，区分二层同名干扰店。",
      "instruction": "先到一层红色 BAKERY 面包店前，面向招牌停留2秒，记住它的位置；再沿楼梯到二层，找到与一层处于相同位置的 BAKERY 分店，走近招牌并面向它停留2秒。注意区分二层另一家同名店。",
      "boundary": "相机参考回放；当前为店铺组合场景。3D 预览使用观察剖切层，路线来自视频相机位置。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcnS6vbXwYht9MZePgdwnqMuv",
      "duration": 41.25,
      "width": 960,
      "height": 540,
      "video": "assets/video/SP01.mp4",
      "poster": "assets/poster/SP01.jpg",
      "images": [
        {
          "src": "assets/routes/SP01-1.jpg",
          "caption": "SP01｜场景斜视总览｜实际场景RTX渲染＋当前视频相机轨迹；建筑剖切为说明用观察层。"
        },
        {
          "src": "assets/routes/SP01-2.jpg",
          "caption": "SP01｜楼梯连接近景｜实际场景RTX渲染＋当前视频相机轨迹；建筑剖切为说明用观察层。"
        }
      ]
    },
    {
      "id": "SP02",
      "dimension": "SP",
      "title": "面包店 → 药店 → 起点",
      "asset": "WYY 多层组合场景 · HSSD 陈设",
      "description": "跨层完成有顺序的多目标任务，保留完整上楼和下楼过程。",
      "instruction": "先到一层红色 BAKERY 面包店前停留2秒，再沿楼梯上二层，到绿色 PHARMACY 药店前停留2秒，最后下楼回到出发位置停留2秒。",
      "boundary": "相机参考回放；相似店铺为派生组合布置，未运行机器人控制器。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcnHEIeSnZxsnRXW5UHiDyird",
      "duration": 81,
      "width": 960,
      "height": 540,
      "video": "assets/video/SP02.mp4",
      "poster": "assets/poster/SP02.jpg",
      "images": [
        {
          "src": "assets/routes/SP02-1.jpg",
          "caption": "SP02｜场景斜视总览｜实际场景RTX渲染＋当前视频相机轨迹；建筑剖切为说明用观察层。"
        },
        {
          "src": "assets/routes/SP02-2.jpg",
          "caption": "SP02｜楼梯连接近景｜实际场景RTX渲染＋当前视频相机轨迹；建筑剖切为说明用观察层。"
        }
      ]
    },
    {
      "id": "SP03",
      "dimension": "SP",
      "title": "穿越商场的相似楼层",
      "asset": "Mall interior · peeraphon viriyahirunpaiboon",
      "description": "从餐饮区穿过中庭，登上二层，定位 ATM 旁的卫生间标识，再返回。",
      "instruction": "从一层果汁餐饮区出发，沿中央阶梯登上二层。在布局相似的中庭走廊中找到右侧 ATM 旁的卫生间标识，然后沿原阶梯返回一层餐饮区。",
      "boundary": "现成三层商场资产，本段验证一、二层往返。Isaac Sim 6.0.1 相机回放；无机器人本体或策略参与。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcnvyERSgqmFvwAhZD4SCQRTb",
      "duration": 131.625,
      "width": 1280,
      "height": 720,
      "video": "assets/video/SP03.mp4",
      "poster": "assets/poster/SP03.jpg",
      "images": [
        {
          "src": "assets/routes/SP03-1.jpg",
          "caption": "免费现成商场：六个真实Isaac视角。底排为隐藏顶棚与第三层的观察覆盖层。"
        },
        {
          "src": "assets/routes/SP03-2.jpg",
          "caption": "源几何平面图与两层参考轨迹：蓝绿色为层内路线，橙色为原有阶梯。"
        },
        {
          "src": "assets/routes/SP03-3.jpg",
          "caption": "SP03｜场景斜视总览｜实际场景RTX渲染＋当前视频相机轨迹；建筑剖切为说明用观察层。"
        },
        {
          "src": "assets/routes/SP03-4.jpg",
          "caption": "SP03｜楼梯连接近景｜实际场景RTX渲染＋当前视频相机轨迹；建筑剖切为说明用观察层。"
        }
      ]
    },
    {
      "id": "GE01",
      "dimension": "GE",
      "title": "从咖啡馆走向街角",
      "asset": "Paris scene26 · 城市 + 咖啡馆",
      "description": "沿连续入口从咖啡馆走到室外，在人行道转角停稳。",
      "instruction": "从咖啡馆吧台前的通道出发，沿高脚椅外侧走向入口。穿过入口后左转，沿人行道走到白色咖啡馆外墙与深色楼体相接的转角前，停稳。",
      "boundary": "基于 Go2 仿真行走记录与真值引导，视频为固定高度的稳定虚拟相机重渲染。3D 路线采用穿透叠加，不编码遮挡。",
      "mode": "Go2 记录 · 稳定相机重渲染",
      "modeShort": "GO2 RECORD · RE-RENDER",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcnpg62U8WI4Dv9jqu3LBYTwd",
      "duration": 26.75,
      "width": 960,
      "height": 540,
      "video": "assets/video/GE01.mp4",
      "poster": "assets/poster/GE01.jpg",
      "images": [
        {
          "src": "assets/routes/GE01-1.jpg",
          "caption": "GE01｜水平 FOV 110°、固定高度与水平视角｜完整视频抽帧（2026-10-27）"
        },
        {
          "src": "assets/routes/GE01-2.jpg",
          "caption": "GE01｜场景斜视总览｜实际场景RTX渲染＋当前视频相机轨迹；建筑剖切为说明用观察层。"
        },
        {
          "src": "assets/routes/GE01-3.jpg",
          "caption": "GE01｜反向斜俯视｜实际场景RTX渲染＋当前视频相机轨迹；建筑剖切为说明用观察层。"
        }
      ]
    },
    {
      "id": "GE02",
      "dimension": "GE",
      "title": "Bistro · 室内外往返",
      "asset": "Amazon Lumberyard Bistro · ORCA",
      "description": "餐馆、街区、再回到原餐馆。70.6 米连续路径连接室内与室外。",
      "instruction": "从餐馆后部的通道出发，经过吧台和用餐区，从铺有门垫的入口走到室外。沿街道向路灯和露天桌椅所在的一侧走，经过街角后绕回餐馆正门；从同一个入口进入，走到用餐区靠墙的餐桌旁停下。",
      "boundary": "专家相机预览；只有一处已确认的完整餐馆室内。门口约16厘米高差尚需机器人验证。视频使用原生 glTF 材质渲染，3D 预览使用 Isaac。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcnoDn7qQ2no3B4zyexMd8JhD",
      "duration": 136.25,
      "width": 1280,
      "height": 720,
      "video": "assets/video/GE02.mp4",
      "poster": "assets/poster/GE02.jpg",
      "images": [
        {
          "src": "assets/routes/GE02-1.jpg",
          "caption": "Bistro 单一室内往返路线：蓝色为室内出发段，绿色为室外段，橙色为返回原室内；仅为几何筛查与相机路线。"
        },
        {
          "src": "assets/routes/GE02-2.jpg",
          "caption": "Bistro 单一室内往返｜完整相机预览抽帧；固定世界高度、水平 FOV110，无主动俯仰/横滚动作。"
        },
        {
          "src": "assets/routes/GE02-3.jpg",
          "caption": "GE02｜场景斜视总览｜实际场景RTX渲染＋当前视频相机轨迹；建筑剖切为说明用观察层。"
        },
        {
          "src": "assets/routes/GE02-4.jpg",
          "caption": "GE02｜反向斜俯视｜实际场景RTX渲染＋当前视频相机轨迹；建筑剖切为说明用观察层。"
        }
      ]
    },
    {
      "id": "GE03",
      "dimension": "GE",
      "title": "House15 · 穿过庭院",
      "asset": "Modern House15 · 住宅与室外步道",
      "description": "98.39 米长版路线：客厅、花园、院外步道、厨房与独立卫生间。",
      "instruction": "从客厅绿色沙发旁出发，穿过玻璃门，经过泳池和凉亭，前往院外步道上的木质门架；随后从住宅侧门进入厨房，找到独立卫生间，在绿色洗手盆前停下。",
      "boundary": "同一栋住宅中的不同室内空间，长路线主要位于室外。专家相机回放和几何代理检查，不含整机动力学或模型闭环。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcnqD1Vr4zBZ37NzcbCtyGpeh",
      "duration": 190.25,
      "width": 1280,
      "height": 720,
      "video": "assets/video/GE03.mp4",
      "poster": "assets/poster/GE03.jpg",
      "images": [
        {
          "src": "assets/routes/GE03-1.jpg",
          "caption": "GE03｜190.25秒长版均匀抽帧：客厅—花园—院外木门架—侧门厨房—独立卫生间。专家相机回放。"
        }
      ]
    },
    {
      "id": "GE04",
      "dimension": "GE",
      "title": "城市公园 · 低位地面 90°",
      "asset": "NVIDIA Emerald Square · 原生城市街区",
      "description": "同一个长椅目标，0.35米低位地面视角沿入口绕行19.11米。水平 FOV 90°。",
      "instruction": "前往公园南侧最靠西的木质靠背长椅，并在长椅前停下。",
      "boundary": "专家相机回放与几何代理检查；同平台的三个 FOV 版本使用相同轨迹。未验证 Go2 / UAV 整机动力学或导航模型。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcns2m6Hhg2zoNpcm3rGpjuoh",
      "duration": 34.25,
      "width": 1280,
      "height": 720,
      "video": "assets/video/GE04.mp4",
      "poster": "assets/poster/GE04.jpg",
      "images": []
    },
    {
      "id": "GE05",
      "dimension": "GE",
      "title": "城市公园 · 低位地面 110°",
      "asset": "NVIDIA Emerald Square · 原生城市街区",
      "description": "同一个长椅目标，0.35米低位地面视角沿入口绕行19.11米。水平 FOV 110°。",
      "instruction": "前往公园南侧最靠西的木质靠背长椅，并在长椅前停下。",
      "boundary": "专家相机回放与几何代理检查；同平台的三个 FOV 版本使用相同轨迹。未验证 Go2 / UAV 整机动力学或导航模型。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcnqG8QWdRZVA8jBGwDBba4pf",
      "duration": 34.25,
      "width": 1280,
      "height": 720,
      "video": "assets/video/GE05.mp4",
      "poster": "assets/poster/GE05.jpg",
      "images": []
    },
    {
      "id": "GE06",
      "dimension": "GE",
      "title": "城市公园 · 低位地面 120°",
      "asset": "NVIDIA Emerald Square · 原生城市街区",
      "description": "同一个长椅目标，0.35米低位地面视角沿入口绕行19.11米。水平 FOV 120°。",
      "instruction": "前往公园南侧最靠西的木质靠背长椅，并在长椅前停下。",
      "boundary": "专家相机回放与几何代理检查；同平台的三个 FOV 版本使用相同轨迹。未验证 Go2 / UAV 整机动力学或导航模型。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcn4YF76B4QhPKGLmKJAnjuGb",
      "duration": 34.25,
      "width": 1280,
      "height": 720,
      "video": "assets/video/GE06.mp4",
      "poster": "assets/poster/GE06.jpg",
      "images": []
    },
    {
      "id": "GE07",
      "dimension": "GE",
      "title": "城市公园 · 空中机位 90°",
      "asset": "NVIDIA Emerald Square · 原生城市街区",
      "description": "同一个长椅目标，2.5米固定高度机位采用7米越障路线。水平 FOV 90°。",
      "instruction": "前往公园南侧最靠西的木质靠背长椅，并在长椅前停下。",
      "boundary": "专家相机回放与几何代理检查；同平台的三个 FOV 版本使用相同轨迹。未验证 Go2 / UAV 整机动力学或导航模型。空中90°版接近终点时椅背位于画面下沿。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcnfbt9zQy0lk1Zn8AX3pbvvb",
      "duration": 11.166667,
      "width": 1280,
      "height": 720,
      "video": "assets/video/GE07.mp4",
      "poster": "assets/poster/GE07.jpg",
      "images": []
    },
    {
      "id": "GE08",
      "dimension": "GE",
      "title": "城市公园 · 空中机位 110°",
      "asset": "NVIDIA Emerald Square · 原生城市街区",
      "description": "同一个长椅目标，2.5米固定高度机位采用7米越障路线。水平 FOV 110°。",
      "instruction": "前往公园南侧最靠西的木质靠背长椅，并在长椅前停下。",
      "boundary": "专家相机回放与几何代理检查；同平台的三个 FOV 版本使用相同轨迹。未验证 Go2 / UAV 整机动力学或导航模型。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcnOYdjJMyiRmdIKAZqsjNNGf",
      "duration": 11.166667,
      "width": 1280,
      "height": 720,
      "video": "assets/video/GE08.mp4",
      "poster": "assets/poster/GE08.jpg",
      "images": []
    },
    {
      "id": "GE09",
      "dimension": "GE",
      "title": "城市公园 · 空中机位 120°",
      "asset": "NVIDIA Emerald Square · 原生城市街区",
      "description": "同一个长椅目标，2.5米固定高度机位采用7米越障路线。水平 FOV 120°。",
      "instruction": "前往公园南侧最靠西的木质靠背长椅，并在长椅前停下。",
      "boundary": "专家相机回放与几何代理检查；同平台的三个 FOV 版本使用相同轨迹。未验证 Go2 / UAV 整机动力学或导航模型。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcnXMU2lckrJSnb2m9v7rDdQc",
      "duration": 11.166667,
      "width": 1280,
      "height": 720,
      "video": "assets/video/GE09.mp4",
      "poster": "assets/poster/GE09.jpg",
      "images": []
    },
    {
      "id": "LH01",
      "dimension": "LH",
      "title": "工厂 · 完整巡检路线",
      "asset": "NVIDIA 工厂 · portable_factory 任务层",
      "description": "约291米，5个站点与8个事件。异常检查、授权、复位与返回形成依赖链。",
      "instruction": "从起点出发，走到西侧的调度台前查看本班次工单并领取巡检许可；然后去北区通道尽头的故障配电柜检查指示灯，若为红色异常，先到东北侧的电源柜核查供电，再返回途中在维修站领取授权卡，回到故障柜完成隔离并确认复位绿灯；之后检查南侧的安全门，最后回到调度台归还授权卡并提交巡检记录。",
      "boundary": "专家相机路线与原任务事件回放。事件属于抽象任务回放，未构成模型自主操作结果。",
      "mode": "专家路线 · 任务事件回放",
      "modeShort": "EXPERT ROUTE + EVENTS",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcn27FY3QwEs8heonboijCpSg",
      "duration": 466.25,
      "width": 960,
      "height": 540,
      "video": "assets/video/LH01.mp4",
      "poster": "assets/poster/LH01.jpg",
      "images": [
        {
          "src": "assets/routes/LH01-1.jpg",
          "caption": "LH01｜水平 FOV 110°、固定高度与水平视角｜完整视频抽帧（2026-10-27）"
        },
        {
          "src": "assets/routes/LH01-2.jpg",
          "caption": "LH01｜场景斜视总览｜实际场景RTX渲染＋当前视频相机轨迹；建筑剖切为说明用观察层。"
        },
        {
          "src": "assets/routes/LH01-3.jpg",
          "caption": "LH01｜反向斜俯视｜实际场景RTX渲染＋当前视频相机轨迹；建筑剖切为说明用观察层。"
        }
      ]
    },
    {
      "id": "LH02",
      "dimension": "LH",
      "title": "医院 · 补给与途中加单",
      "asset": "NVIDIA Isaac 医院 · 原生几何与 MDL",
      "description": "双病区补给途中加入临时请求，完成10个任务事件并带回回执。",
      "instruction": "从护士站领取西翼病房A和东翼病房B的补给箱，按箱号送到对应交付台。途中如收到临时补给请求，到物资站取货后一起送往指定病房。进入病房前使用门前按钮，配送完成后携带签收回执返回护士站。",
      "boundary": "专家相机路线与原任务事件回放；保留原有任务及路径，原生材质已修复并配置固定补光。",
      "mode": "专家路线 · 任务事件回放",
      "modeShort": "EXPERT ROUTE + EVENTS",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcn7RnoO56YLpHv63f4aJZTmb",
      "duration": 386.5,
      "width": 960,
      "height": 540,
      "video": "assets/video/LH02.mp4",
      "poster": "assets/poster/LH02.jpg",
      "images": [
        {
          "src": "assets/routes/LH02-1.jpg",
          "caption": "LH02｜水平 FOV 110°、固定高度与水平视角｜完整视频抽帧（2026-10-27）"
        },
        {
          "src": "assets/routes/LH02-2.jpg",
          "caption": "LH02｜场景斜视总览｜实际场景RTX渲染＋当前视频相机轨迹；建筑剖切为说明用观察层。"
        },
        {
          "src": "assets/routes/LH02-3.jpg",
          "caption": "LH02｜反向斜俯视｜实际场景RTX渲染＋当前视频相机轨迹；建筑剖切为说明用观察层。"
        }
      ]
    },
    {
      "id": "MP01",
      "dimension": "MP",
      "title": "户外 · 轮胎与岩木通道",
      "asset": "Poly Haven · 轮胎 / 岩石 / 倒木 / 树林",
      "description": "23.54 米户外路线，依次穿过轮胎窄口与岩木通道，绕过树桩并精确停稳。",
      "instruction": "从土路入口出发，穿过前方两垛旧轮胎之间的窄口；随后向前，从大岩石和倒木之间的通道穿出，再从右侧绕过树桩，最后到蓝色桶前停稳1秒。全程避开轮胎、岩石、木头和桶，不要进入两侧植被区。",
      "boundary": "1059个样点的地面与0.5×0.5米机身包络检查通过；相机回放未验证足端接触、打滑或行走颠簸。资产按 CC0 复用。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcn5f4DmRwTGJOguQuKbVw3Jb",
      "duration": 44.125,
      "width": 1280,
      "height": 720,
      "video": "assets/video/MP01.mp4",
      "poster": "assets/poster/MP01.jpg",
      "images": [
        {
          "src": "assets/routes/MP01-1.jpg",
          "caption": "MP01：Isaac正交俯视图与23.54米参考路线；0为起点，1—4为任务点。"
        },
        {
          "src": "assets/routes/MP01-2.jpg",
          "caption": "MP01：斜视场景总览，可见轮胎门、岩石、倒木、树桩和蓝桶。"
        },
        {
          "src": "assets/routes/MP01-3.jpg",
          "caption": "MP01：从实际编码视频抽取的8个关键帧，标注对应时间和帧号。"
        }
      ]
    },
    {
      "id": "MP02",
      "dimension": "MP",
      "title": "密集障碍 · 地标引导",
      "asset": "Scene-N1 · Hard 障碍场",
      "description": "约39.5米路线，在不同颜色与形状的障碍之间按地标穿行。",
      "instruction": "从场地西南角出发向北走，从白色圆柱南侧绕过它，并停留半秒；转向东北，绕过中央偏西南的红色大球西北侧后向东；沿紫色粗圆柱西南侧的通道穿出并停留半秒，再绕过紫色大球右侧，到东北角停下，转身面向紫色大球停留1秒。全程避开障碍。",
      "boundary": "相机参考回放，路线经视线平滑处理。视频呈现任务与参考路径，不代表机器狗执行成绩。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcnDYQ3RwEWTZNc01gsPyy1Ng",
      "duration": 66.625,
      "width": 960,
      "height": 540,
      "video": "assets/video/MP02.mp4",
      "poster": "assets/poster/MP02.jpg",
      "images": [
        {
          "src": "assets/routes/MP02-1.jpg",
          "caption": "MP02｜场景与轨迹预览"
        }
      ]
    },
    {
      "id": "MP03",
      "dimension": "MP",
      "title": "连续绕障 · 精确停靠",
      "asset": "Scene-N1 · Easy 障碍场",
      "description": "约42.3米路线，连续绕行后按5厘米 / 5度的参考约束停靠。",
      "instruction": "从西南角出发，沿西缘向北，经过粉色细高圆柱西侧并在其北面停留半秒；从红色大球西南侧绕行，转向东北，在品红色圆柱南侧停留半秒；从品红色圆柱与白色大球之间横穿北部，最后到东北角沿行进方向停稳1秒。全程不要碰到障碍物。",
      "boundary": "相机参考回放；末端精度是任务设计与参考轨迹约束，不是已测模型性能。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcn3XgLQrZqgw45xywle7oSiX",
      "duration": 66.125,
      "width": 960,
      "height": 540,
      "video": "assets/video/MP03.mp4",
      "poster": "assets/poster/MP03.jpg",
      "images": [
        {
          "src": "assets/routes/MP03-1.jpg",
          "caption": "MP03｜场景与轨迹预览"
        }
      ]
    },
    {
      "id": "SE01",
      "dimension": "SE",
      "title": "跑道整圈 · 380 秒预算",
      "asset": "程序化操场 · 红色塑胶跑道",
      "description": "同一条168.45米整圈路线，在较宽松预算下完成无碰撞回环。",
      "instruction": "从南侧直道白色终点线出发，沿最内侧车道逆时针跑完一整圈，依次经过东、北、西侧跑道，回到终点线向东跨线停稳1秒。全程保持在红色跑道内，避开路缘、旗杆和围栏。时间预算380秒。",
      "boundary": "程序化自建资产，相机参考回放；计时来自相机轨迹，不是机器狗实际竞速成绩。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcnPitIbm2PkurXlJ1PMjDElh",
      "duration": 268.625,
      "width": 960,
      "height": 540,
      "video": "assets/video/SE01.mp4",
      "poster": "assets/poster/SE01.jpg",
      "images": [
        {
          "src": "assets/routes/SE01-1.jpg",
          "caption": "SE01 最新轨迹预览（2026-10-28正式r1）"
        }
      ]
    },
    {
      "id": "SE02",
      "dimension": "SE",
      "title": "同一路线 · 250 秒预算",
      "asset": "程序化操场 · 红色塑胶跑道",
      "description": "与 SE01 采用相同参考几何，提高参考速度并收紧时间预算。",
      "instruction": "沿与 SE01 相同的参考路线绕跑道一整圈，保持无碰撞并回到终点线停稳1秒。时间预算250秒。",
      "boundary": "相机参考回放；与 SE01 的差异是参考速度和时间预算。",
      "mode": "相机参考回放",
      "modeShort": "CAMERA REPLAY",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#doxcngiARcDlPyVKWgT9oxjGnTb",
      "duration": 180,
      "width": 960,
      "height": 540,
      "video": "assets/video/SE02.mp4",
      "poster": "assets/poster/SE02.jpg",
      "images": [
        {
          "src": "assets/routes/SE02-1.jpg",
          "caption": "SE02 最新轨迹预览（2026-10-28正式r1）"
        }
      ]
    },
    {
      "id": "SE03",
      "dimension": "SE",
      "title": "跑道整圈 · 120 秒预算",
      "asset": "操场跑道 · 新时间预算样例",
      "description": "同一整圈任务的较快版本，检视速度与安全约束的共同要求。",
      "instruction": "从南侧直道白色终点线出发，沿最内侧车道逆时针绕跑道一整圈，按东、北、西侧顺序返回并向东跨线停稳1秒。保持在跑道内，避开路缘、旗杆和围栏。时间预算120秒。",
      "boundary": "原文档提供指令与视频，尚未补全此版本的独立运行与验收说明；当前作为参考展示，不宣称物理行走通过。",
      "mode": "参考视频 · 运行说明待补",
      "modeShort": "REFERENCE · REVIEW PENDING",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#K2EGdA8xSopfdSxNhxQceoyAnmg",
      "duration": 80.625,
      "width": 960,
      "height": 540,
      "video": "assets/video/SE03.mp4",
      "poster": "assets/poster/SE03.jpg",
      "images": [
        {
          "src": "assets/routes/SE03-1.jpg",
          "caption": "SE03｜场景与轨迹预览"
        }
      ]
    },
    {
      "id": "SE04",
      "dimension": "SE",
      "title": "同一路线 · 80 秒预算",
      "asset": "操场跑道 · 新时间预算样例",
      "description": "与 SE03 对应的紧时间窗口，参考路线与安全要求保持一致。",
      "instruction": "在相同场景和起终点条件下，沿同一参考路线绕跑道一整圈，保持无碰撞并回到终点线停稳1秒。时间预算80秒。",
      "boundary": "原文档提供指令与视频，尚未补全此版本的独立运行与验收说明；当前作为参考展示，不宣称物理行走通过。",
      "mode": "参考视频 · 运行说明待补",
      "modeShort": "REFERENCE · REVIEW PENDING",
      "source": "https://xcno7284rraf.feishu.cn/wiki/BPKpwbxnBicP4kkCfi7cwLcvnNg#Q9FFdnmGioLLvgxieXkc1AGfn6g",
      "duration": 54.125,
      "width": 960,
      "height": 540,
      "video": "assets/video/SE04.mp4",
      "poster": "assets/poster/SE04.jpg",
      "images": [
        {
          "src": "assets/routes/SE04-1.jpg",
          "caption": "SE04｜场景与轨迹预览"
        }
      ]
    }
  ]
};
