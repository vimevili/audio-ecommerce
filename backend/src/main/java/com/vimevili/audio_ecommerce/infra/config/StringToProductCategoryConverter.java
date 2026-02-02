package com.vimevili.audio_ecommerce.infra.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.vimevili.audio_ecommerce.enums.ProductCategory;

@Component
public class StringToProductCategoryConverter implements Converter<String, ProductCategory> {

    @Override
    public ProductCategory convert(String source) {
        if (source == null || source.isBlank()) {
            return null;
        }
        return ProductCategory.valueOf(source.toUpperCase());
    }
}
