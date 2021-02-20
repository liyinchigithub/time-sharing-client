<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />

    <!-- 文案 -->
    <div class="content">
      <p
        style="
          font-size: 18pt;
          line-height: 115%;
          margin: 24pt 0pt 12pt;
          page-break-after: avoid;
          page-break-inside: avoid;
          text-align: center;
        "
      >
        <span style="color: #335b8a; font-family: Calibri; font-size: 18pt; font-weight: bold"></span
        ><span style="color: #335b8a; font-family: 宋体; font-size: 18pt; font-weight: bold"
          >用户注册协议及隐私政策
        </span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 1.8pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">&#xa0;</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 1.8pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">&#xa0;</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 1.8pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">&#xa0;</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》 用户服务协议</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">一、特别提示</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >在此特别提醒您（用户）在注册成为 《 租赁平台》APP（以下 部分 简称 “APP”） 用户之前，请认真阅读本《 &lt;
          租赁平台 &gt;APP
          用户服务协议》（以下简称“协议”），确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。
          您同意并点击确认本协议条款且完成注册程序后，才能成为 《 租赁平台 》APP 的正式注册用户，并享受 《 租赁平台
          》APP 的各类服务。 您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。
          若您不同意本协议，或对本协议中的条款存在任何疑问，请您立即停止 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 用户注册程序，并可以选择不使用本网站服务。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">本协议约定 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 与用户之间关于“ 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP ”服务（以下简称“服务”）的权利义务。“用户”是指注册、登录、使用本服务的个人 、单位 。本协议可由 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP
          随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本APP中查阅最新版协议条款。在修改协议条款后，如果用户不接受修改后的条款，请立即停止使用
          《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 提供的服务，用户继续使用 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 提供的服务将被视为接受修改后的协议。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">二、账号注册</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">2.1 用户在使用本服务前需要注册一个《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP账号。APP账号应当使用手机号码绑定注册，请用户使用尚未与《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 账号绑定的手机号码，以及未被 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP根据本协议封禁的手机号码注册APP 账号。 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 可以根据用户需求或产品需要对账号注册和绑定的方式进行变更，而无须事先通知用户。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">2.2 如果注册申请者有被 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 封禁的先例或涉嫌虚假注册及滥用他人名义注册，及其他不能得到许可的理由， 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 将拒绝其注册申请。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">2.3 鉴于《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 账号的绑定注册方式，您同意 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 在注册时将允许您的手机号码及手机设备识别码等信息用于注册。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">2.4 在用户注册及使用本服务时， 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 需要搜集能识别用户身份的个人信息以便 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 可以在必要时联系用户，或为用户提供更好的使用体验。 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 搜集的信息包括但不限于用户的姓名、地址； 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 同意对这些 信息的使用将受限于第三条用户个人隐私信息保护的约束。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">三、账户安全</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">3.1 用户一旦注册成功，成为 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 的用户，将得到一个用户名和密码，并有权利使用自己的用户名及密码随时登陆 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >3.2 用户对用户名和密码的安全负全部责任，同时对以其用户名进行的所有活动和事件负全责。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">3.3 用户不得以任何形式擅自转让或授权他人使用自己的 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 用户名。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >3.4 用户对密码加以妥善保管，切勿将密码告知他人，因密码保管不善而造成的所有损失由用户自行承担。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >3.5 如果用户泄漏了密码，有可能导致不利的法律后果，因此不管任何原因导致用户的密码安全受到威胁，应该立即和 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 客服人员取得联系，否则后果自负。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">四、用户声明与保证</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >4.1 用户承诺其为具有完全民事行为能力的民事主体，且具有达成交易履行其义务的能力。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >4.2 用户有义务在注册时提供自己的真实资料，并保证诸如手机号码、姓名、所在地区等内容的有效性及安全性，保证 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP
          工作人员可以通过上述联系方式与用户取得联系。同时，用户也有义务在相关资料实际变更时及时更新有关注册资料。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">4.3 用户通过使用 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP
          的过程中所制作、上载、复制、发布、传播的任何内容，包括但不限于账号头像、名称、用户说明等注册信息及认证资料，或文字、语音、图片、视频、图文等发送、回复和相关链接页面，以及其他使用账号或本服务所产生的内容，不得违反国家相关法律制度，包含但不限于如下原则：</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">（1） 违反 宪法所确定的基本原则的；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
        </span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">（3）损害国家荣誉和利益的；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">（4）煽动民族仇恨、民族歧视，破坏民族团结的； </span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">（5）破坏国家宗教政策，宣扬邪教和封建迷信的； </span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">（6）散布谣言，扰乱社会秩序，破坏社会稳定的；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >（7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
        </span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">（8）侮辱或者诽谤他人，侵害他人合法权益的； </span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">（9）含有法律、行政法规禁止的其他内容的。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">4.4 用户不得利用《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP账号或本服务制作、上载、复制、发布、传播下干扰《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 正常运营，以及侵犯其他用户或第三方合法权益的内容：</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">（1）含有任何性或性暗示的； </span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">（2）含有辱骂、恐吓、威胁内容的；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">（3）含有骚扰、垃圾广告、恶意信息、诱骗信息的；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">（4）涉及他人隐私、个人信息或资料的；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >（5）侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >（6）含有其他干扰本服务正常运营和侵犯其他用户或第三方合法权益内容的信息。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">五、服务内容</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">5.1 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》 APP （以下简称“ A PP ”） 是 X XX 公司旗下开发的一款手机终端应用 。 具体服务内容由 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 根据实际情况提供，包括但不限于： </span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >（1） 商城 购物 ， 以及 与 购物相关的订单 处理 、 物流 查询 、退款 退货等流程 ；</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">（2） 购物 配送服务；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">（3） 虚拟货币 如 红包、积分等 ；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >（4） 合作 客户（ 包括 但不限于机构、个人等） 收入结算和用户费用 支付 等 ，具体 政策 以 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 对应 版块 公示政策 为准 。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">（5） 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 可能提供 的其他服务。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">5.2 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 有权随时审核或删除用户发布/传播的涉嫌违法或违反社会主义精神文明，或者被 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 认为不妥当的内容（包括但不限于文字、语音、图片、视频、图文等）。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >5.3 所有发给用户的通告及其他消息都可通过APP或者用户所提供的联系方式发送。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">六、服务的终止</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">6.1 在下列情况下， 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 有权终止向用户提供服务：</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">6 .1.1 在用户违反本服务协议相关规定时， 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 有权终止向该用户提供服务 ； 如该用户再一次直接或间接或以他人名义注册为用户的，一经发现， 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 有权直接单方面终止向该用户提供服务；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >6 .1.2 用户不得通过程序或 其他任何方式套取 不正当利益 或作弊，若发现用户有作弊行为， 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 将立即终止服务，并有权扣 除作弊 所获得的非正当 利益 ；</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">6 .1.4 一旦 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 发现用户提供的数据或信息中含有虚假内容， 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 有权随时终止向该用户提供服务；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >6 .1.5 本服务条款终止或更新时，用户明示不愿接受新的服务条款；</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">6 .1.6 其它 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 认为需终止服务的情况。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">6.2 服务终止后， 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 没有义务为用户保留原账号中或与之相关的任何信息，或转发任何未曾阅读或发送的信息给用户或第三方。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >6.3 用户理解并同意，即便在本协议终止及用户的服务被终止后， 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 仍有权：</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">6 .3.1 继续保存您的用户信息；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >6 .3.2 继续向用户主张在其使用平台服务期间因违反法律法规、本协议及平台规则而应承担的责任。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">七、服务的变更、中断</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">7.1 鉴于网络服务的特殊性，用户需同意 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP
          会变更、中断部分或全部的网络服务，并删除（不再保存）用户在使用过程中提交的任何资料，而无需通知用户，也无需对任何用户或任何第三方承担任何责任。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">7.2 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 需要定期或不定期地对提供网络服务的平台进行检测或者更新，如因此类情况而造成网络服务在合理时间内的中断，
          《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 无需为此承担任何责任。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">八、服务条款修改</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">8.1 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 有权随时修改本服务条款的任何内容，一旦本服务条款的任何内容发生变动， 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 将会通过适当方式向用户提示修改内容。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">8.2 如果不同意 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 对本服务条款所做的修改，用户有权停止使用网络服务。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">8.3 如果用户继续使用网络服务，则视为用户接受 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 对本服务条款所做的修改。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">九、免责与赔偿声明</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">9.1 若 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP
          已经明示其服务提供方式发生变更并提醒用户应当注意事项，用户未按要求操作所产生的一切后果由用户自行承担。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">9.2 用户明确同意其使用 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 所存在的风险将完全由其自己承担，因其使用 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 而产生的一切后果也由其自己承担。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">9.3 用户同意保障和维护 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 及其他用户的利益，由于用户在使用 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 有违法、不真实、不正当、侵犯第三方合法权益的行为，或用户违反本协议项下的任何条款而给 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 及任何其他第三方造成损失，用户同意承担由此造成的损害赔偿责任。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >9.4   A PP
          所收集的部分公开资料来源于互联网，转载的目的在于传递更多信息及用于网络分享，并不代表本站赞同其观点和对其真实性负责，也不构成任何其他建议。本站部分作品是由网友自主投稿和发布、编辑整理上传，对此类作品本站仅提供交流平台，不为其版权负责。如果您发现网站上有侵犯您的知识产权的作品，请与我们取得联系，我们会及时修改或删除。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">
          9.5   A PP
          所提供的信息，只供参考之用。本网站不保证信息的准确性、有效性、及时性和完整性。本网站及其雇员一概毋须以任何方式就任何信息传递或传送的失误、不准确或错误，对用户或任何其他人士负任何直接或间接责任。在法律允许的范围内，本网站在此声明，不承担用户或任何人士就使用或未能使用本网站所提供的信息或任何链接所引致的任何直接、间接、附带、从属、特殊、惩罚性或惩戒性的损害赔偿。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">十、隐私声明</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">10.1 适用范围：</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">1 0.1.1 在用户注册 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 账户时，根据要求提供的个人注册信息 ；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">1 0.1.2 在用户使用 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP ，或访问其相关网页时， 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 自动接收并记录的用户浏览器上的服务器数值，包括但不限于IP地址等数据及用户要求取用的网页记录。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">10.2 信息使用：</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">1 0.2.1 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 不会向任何人出售或出借用户的个人信息，除非事先得到用户的许可 ；</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">1 0.2.2 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP
          亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播用户的个人信息。任何用户如从事上述活动，一经发现， 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 有权立即终止与该用户的服务协议，查封其账号 ；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">1 0.2.3 为达到服务用户的目的， 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 可能通过使用用户的个人信息，向用户提供服务，包括但不限于向用户发出产品和服务信息，或者与 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 合作伙伴共享信息以便他们向用户发送有关其产品和服务的信息。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">10.3 信息披露：</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">用户的个人信息将在下述情况下部分或全部被披露： </span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">1 0.3.1 经用户同意，向第三方披露；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >1 0.3.2 根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >1 0.3.3 如果用户出现违反中国有关法律或者网站政策的情况，需要向第三方披露；
        </span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >1 0.3.4 为提供用户所要求的产品和服务，而必须和第三方分享用户的个人信息；
        </span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">1 0.3.5 其它 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 根据法律或者网站政策认为合适的披露；</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">十一、其他</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">11.1 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 郑重提醒用户注意本协议中免除 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 责任和限制用户权利的条款，请用户仔细阅读，自主考虑风险。未成年人应在法定监护人的陪同下阅读本协议。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >11.2 本协议的效力、解释及纠纷的解决，适用于中华人民共和国法律。若用户和 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt">
          》APP 之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，用户同意将纠纷或争议提交 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 住所地有管辖权的人民法院管辖。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt"
          >11.3 本协议的任何条款无论因何种原因无效或不具可执行性，其余条款仍有效，对双方具有约束力。</span
        >
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">11.4 本协议最终解释权归 《 </span
        ><span style="font-family: Cambria; font-size: 12pt">租赁平台</span
        ><span style="font-family: Cambria; font-size: 12pt"> 》APP 所有，并且保留一切解释和修改的权力。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 9pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">11.5 本协议从20</span
        ><span style="font-family: Cambria; font-size: 12pt">21</span
        ><span style="font-family: Cambria; font-size: 12pt"> 年 </span
        ><span style="font-family: Cambria; font-size: 12pt">1</span
        ><span style="font-family: Cambria; font-size: 12pt"> 月 </span
        ><span style="font-family: Cambria; font-size: 12pt">15</span
        ><span style="font-family: Cambria; font-size: 12pt"> 日起适用。</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 1.8pt 0pt">
        <br /><br /><br /><br /><span style="font-family: Cambria; font-size: 12pt">&#xa0;</span>
      </p>
      <p style="font-size: 12pt; line-height: 115%; margin: 1.8pt 0pt">
        <span style="font-family: Cambria; font-size: 12pt">&#xa0;</span>
      </p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'privacyPolicy', // 用户协议页
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.push('/login')
      // this.$router.go(-1);// 返回上一页
    }
  },
  watch: {},
  directives: {},
  beforeCreate() {},
  created() {}
}
</script>
<style lang="scss" scoped>
.content {
  width: 95%;
  margin-top: 15%;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 2%;
}
</style>