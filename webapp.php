<?php
/**
 * juancai_jisuanqi模块PC接口定义
 *
 * @author Haoleiqin
 * @url 
 */
defined('IN_IA') or exit('Access Denied');

class Juancai_jisuanqiModuleWebapp extends WeModuleWebapp {
	public function doPageTest(){
		global $_GPC, $_W;
		$errno = 0;
		$message = '返回消息';
		$data = array();
		return $this->result($errno, $message, $data);
	}

}