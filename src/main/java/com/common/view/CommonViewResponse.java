package com.common.view;


import java.io.Serializable;
import java.util.Collection;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Component
@Scope(value = BeanDefinition.SCOPE_PROTOTYPE)
public class CommonViewResponse<T> implements Serializable {
	/**
	 * 
	 */

	private static final long serialVersionUID = -1042041470400958131L;
	private Collection<T> rows;
	private boolean success;
	private String reason;
	private String total;
	private Object data;

	public String getTotal() {
		return total;
	}

	public void setTotal(final String total) {
		this.total = total;
	}

	public Collection<T> getRows() {
		return rows;
	}

	public void setRows(final Collection<T> rows) {
		this.rows = rows;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(final boolean success) {
		this.success = success;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(final String reason) {
		this.reason = reason;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
