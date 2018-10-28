<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        id="navbarCollapse"
        class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <router-link
            tag="li"
            to="/">
            <a class="nav-link">Домой</a>
          </router-link>

          <router-link
            tag="li"
            to="/users">
            <a class="nav-link">Список пользователей</a>
          </router-link>

          <router-link
            tag="li"
            to="/users/add">
            <a class="nav-link">Добавить пользователя</a>
          </router-link>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>
