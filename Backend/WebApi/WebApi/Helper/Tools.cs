﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace WebApi.Helper
{
    public static class Tools
    {
        public static bool IsNullOrEmpty<T>(this T value)
        {
            if (typeof(T) == typeof(string)) return string.IsNullOrEmpty(value as string);

            return value == null || value.Equals(default(T));
        }

        public static dynamic Cast(dynamic obj, Type castTo)
        {
            return Convert.ChangeType(obj, castTo);
        }

        public static string[] GetFilledProperties<T>(this T value)
        {
            if (value.IsNullOrEmpty())
                throw new ArgumentNullException(nameof(value), $"{nameof(value)} no puede se nulo.");

            bool PropertyHasValue(PropertyInfo prop)
            {
                if (prop.GetValue(value) is IList list && list.Count == 0) return false;

                return prop.GetValue(value) == null
                    ? false
                    : !IsNullOrEmpty(Cast(prop.GetValue(value), prop.GetValue(value).GetType()));
            }

            return value.GetType()
                        .GetProperties()
                        .Where(PropertyHasValue)
                        .Select(p => p.Name)
                        .ToArray();
        }
    }
}
